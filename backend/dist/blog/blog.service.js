"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const blog_entity_1 = require("./blog.entity");
let BlogService = class BlogService {
    constructor(blogRepository) {
        this.blogRepository = blogRepository;
    }
    async findAll(page = 1, limit = 10) {
        const [blogs, total] = await this.blogRepository.findAndCount({
            where: { bltn_cls_cd: 'BLOG' },
            select: ['bltn_no', 'titl', 'contt', 'tag', 'inpt_dtm', 'thumbnail_img_url'],
            skip: (page - 1) * limit,
            take: limit,
            order: { inpt_dtm: 'DESC' },
        });
        return {
            blogs: blogs.map(blog => (Object.assign(Object.assign({}, blog), { contt: blog.contt.length > 20 ? `${blog.contt.substring(0, 20)}...` : blog.contt }))),
            total
        };
    }
    async findOne(id) {
        const blog = await this.blogRepository.findOne({ where: { bltn_no: id } });
        if (!blog) {
            throw new common_1.NotFoundException(`Blog with ID ${id} not found`);
        }
        return blog;
    }
    async create(blogData) {
        const newBlog = this.blogRepository.create(Object.assign(Object.assign({}, blogData), { bltn_cls_cd: 'BLOG', inpt_dtm: new Date() }));
        return this.blogRepository.save(newBlog);
    }
    async update(id, blogData) {
        await this.blogRepository.update(id, blogData);
        return this.findOne(id);
    }
};
exports.BlogService = BlogService;
exports.BlogService = BlogService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(blog_entity_1.Blog)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], BlogService);
//# sourceMappingURL=blog.service.js.map