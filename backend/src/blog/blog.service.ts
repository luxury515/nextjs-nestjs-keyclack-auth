import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from './blog.entity';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private blogRepository: Repository<Blog>,
  ) {}

  async findAll(page: number = 1, limit: number = 10): Promise<{ blogs: Blog[], total: number }> {
    const [blogs, total] = await this.blogRepository.findAndCount({
      where: { bltn_cls_cd: 'BLOG' },
      select: ['bltn_no', 'titl', 'contt', 'tag', 'inpt_dtm', 'thumbnail_img_url'],
      skip: (page - 1) * limit,
      take: limit,
      order: { inpt_dtm: 'DESC' },
    });

    return { 
      blogs: blogs.map(blog => ({
        ...blog,
        contt: blog.contt.length > 20 ? `${blog.contt.substring(0, 20)}...` : blog.contt
      })),
      total 
    };
  }

  async findOne(id: string): Promise<Blog> {
    const blog = await this.blogRepository.findOne({ where: { bltn_no: id } });
    if (!blog) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }
    return blog;
  }

  async create(blogData: Partial<Blog>, token: string): Promise<Blog> {
    const tokenPayload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
    const userId = tokenPayload.preferred_username;

    const user = await this.blogRepository.manager.query(`
      SELECT ogdp_co_id FROM tmdm_sysusr_m WHERE usr_id = $1
    `, [userId]);

    if (!user.length) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const ogdpCoId = user[0].ogdp_co_id;

    const queryRunner = this.blogRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const result = await queryRunner.query(`
        SELECT 'BLT' || TO_CHAR(NOW(),'YYMM') || LPAD(TO_NUMBER(RIGHT(COALESCE(MAX(bltn_no),'0'),5)) + 1 , 5, '0') AS new_bltn_no
        FROM tcus_bltn_m
      `);

      const newBltnNo = result[0].new_bltn_no;

      const newBlog = this.blogRepository.create({
        ...blogData,
        bltn_no: newBltnNo,
        corp_cd: ogdpCoId,
        bltn_cls_cd: 'BLOG',
        inpt_dtm: new Date(),
        inpt_usr_id: userId,
        updt_usr_id: userId,
        updt_dtm: new Date(),
      });

      await queryRunner.manager.save(newBlog);
      await queryRunner.commitTransaction();
      return newBlog;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async update(id: string, blogData: Partial<Blog>): Promise<Blog> {
    await this.blogRepository.update(id, blogData);
    return this.findOne(id);
  }
}