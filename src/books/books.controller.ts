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
    const order = await this.booksService.getById(id);
    if (!order) throw new NotFoundException('Book not found');
    return order;
  }


  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  async deleteById(@Param('id', new ParseUUIDPipe()) id: string) {

    if (!(await this.booksService.getById(id)))
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
    if (!(await this.booksService.getById(id)))
      throw new NotFoundException('Book not found');

    await this.booksService.updateById(id, orderData);
    return { success: true };
  }
  
}
