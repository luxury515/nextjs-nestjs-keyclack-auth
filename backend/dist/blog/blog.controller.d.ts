import { BlogService } from './blog.service';
import { Blog } from './blog.entity';
export declare class BlogController {
    private readonly blogService;
    constructor(blogService: BlogService);
    findAll(page?: number, limit?: number): Promise<{
        blogs: Blog[];
        total: number;
    }>;
    findOne(id: string): Promise<Blog>;
    create(blogData: Partial<Blog>): Promise<Blog>;
    update(id: string, blogData: Partial<Blog>): Promise<Blog>;
}
