import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Blog } from './entities/blog.entity';
import { FilesInterceptor } from '@nestjs/platform-express';
import { storage } from '../utils/multer-config';

@Controller('blogs')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get('/latest')
  getLatestThree(): Promise<Blog[]> {
    return this.blogService.findLatestThree();
  }

  @Post()
  @UseInterceptors(FilesInterceptor('images', 10, { storage })) 
  create(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() createDto: CreateBlogDto,
  ): Promise<Blog> {
    if (files && files.length > 0) {
      createDto.images = files.map(file => `/uploads/blogs/${file.filename}`);
    }
    return this.blogService.create(createDto);
  }

  @Get()
  findAll(): Promise<Blog[]> {
    return this.blogService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Blog> {
    return this.blogService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FilesInterceptor('images', 10, { storage }))
  update(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFiles() files: Express.Multer.File[],
    @Body() updateDto: UpdateBlogDto,
  ): Promise<Blog> {
    if (files && files.length > 0) {
      updateDto.images = files.map(
        (file) => `/uploads/blogs/${file.filename}`,
      );
    }
    return this.blogService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.blogService.remove(id);
  }
}
