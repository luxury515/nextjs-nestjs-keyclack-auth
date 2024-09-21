import { Repository } from 'typeorm';
import { Blog } from './blog.entity';
export declare class BlogService {
    private blogRepository;
    constructor(blogRepository: Repository<Blog>);
    findAll(page?: number, limit?: number): Promise<{
        blogs: Blog[];
        total: number;
    }>;
    findOne(id: string): Promise<Blog>;
    create(blogData: Partial<Blog>): Promise<Blog>;
    update(id: string, blogData: Partial<Blog>): Promise<Blog>;
}
