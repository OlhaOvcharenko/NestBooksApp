import { Controller, UseGuards } from '@nestjs/common';
import { BooksService } from './books.service';
import { Get, Delete, Put, Post, Body, Param } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { ParseUUIDPipe } from '@nestjs/common';
import { CreateBookDTO } from './dtos/create-book.dto';
import { UpdateBookDTO } from './dtos/update-book.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService ) {}

  @Get('/')
  async getAll() {
    return this.booksService.getAll();
  }

  @Get('/:id')
  async getById(@Param('id') id: string) {
    const book = await this.booksService.getById(id);
    if (!book) throw new NotFoundException('Book not found');
    return book;
  }


  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  async deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
    const book = await this.booksService.getById(id);
    if (!book)
      throw new NotFoundException('Book not found');

    await this.booksService.deleteById(id);
    return { success: true };
  }

  @Post('/')
  @UseGuards(JwtAuthGuard)
    create(@Body() orderData: CreateBookDTO) {
    return this.booksService.create(orderData);
  }

  @Put('/:id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() orderData: UpdateBookDTO,
  ){
    const book = await this.booksService.getById(id);
    if (!book)
      throw new NotFoundException('Book not found');

    await this.booksService.updateById(id, orderData);
    return { success: true };
  }
  
}
