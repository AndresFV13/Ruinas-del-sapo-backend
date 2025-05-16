import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Blog } from './entities/blog.entity';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private readonly blogRepo: Repository<Blog>,
  ) {}

  async findLatestThree(): Promise<Blog[]> {
    return this.blogRepo.find({
      order: { createdAt: 'DESC' },
      take: 3,
    });
  }

  async create(createDto: CreateBlogDto): Promise<Blog> {
    const blog = this.blogRepo.create(createDto);
    return this.blogRepo.save(blog);
  }

  findAll(): Promise<Blog[]> {
    return this.blogRepo.find();
  }

  async findOne(id: number): Promise<Blog> {
    const blog = await this.blogRepo.findOneBy({ id });
    if (!blog) throw new NotFoundException(`Blog #${id} not found`);
    return blog;
  }

  async update(id: number, updateDto: UpdateBlogDto): Promise<Blog> {
    const blog = await this.findOne(id);
    Object.assign(blog, updateDto);
    return this.blogRepo.save(blog);
  }

  async remove(id: number): Promise<void> {
    const result = await this.blogRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException(`Blog #${id} not found`);
  }
}