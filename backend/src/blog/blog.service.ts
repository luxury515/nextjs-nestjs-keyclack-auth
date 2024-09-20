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

  async create(blogData: Partial<Blog>): Promise<Blog> {
    const newBlog = this.blogRepository.create({
      ...blogData,
      bltn_cls_cd: 'BLOG',  // 기본값 설정
      inpt_dtm: new Date()  // 현재 날짜로 설정
    });
    return this.blogRepository.save(newBlog);
  }

  async update(id: string, blogData: Partial<Blog>): Promise<Blog> {
    await this.blogRepository.update(id, blogData);
    return this.findOne(id);
  }
}