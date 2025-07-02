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
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { cloudinaryStorage } from '../cloudinary/cloudinary.storage';

@Controller('blogs')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get('/latest')
  getLatestThree(): Promise<Blog[]> {
    return this.blogService.findLatestThree();
  }

  @Post()
  @UseInterceptors(FileInterceptor('image', { storage: cloudinaryStorage }))
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
  @UseInterceptors(FileInterceptor('image', { storage: cloudinaryStorage }))
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
