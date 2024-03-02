import { Controller } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { Get, Delete , Param, Body, Post, Put } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { ParseUUIDPipe } from '@nestjs/common';
import { CreateAuthorDTO } from './dtos/create-author.dto';
import { UpdateAuthorDTO } from './dtos/update-author.dto';

@Controller('authors')
export class AuthorsController {
  constructor(private authorsService: AuthorsService) {}

  @Get('/')
    async getAll() {
      return this.authorsService.getAll();
    }

  @Get('/:id')
    async getById(@Param('id', new ParseUUIDPipe()) id: string) {
      const author = await this.authorsService.getById(id);
      if (!author) throw new NotFoundException('Author not found');
      return author;
    }

    @Delete('/:id')
    async deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
      if (!(await this.authorsService.getById(id)))
        throw new NotFoundException('Author not found');
      await this.authorsService.deleteById(id);
      return { success: true };
    }

    @Post('/')
    create(@Body() authorData: CreateAuthorDTO) {
      
      return this.authorsService.create(authorData);
    }

    @Put('/:id')
    async  update(@Param('id', new ParseUUIDPipe()) id: string,
    @Body() authorData: UpdateAuthorDTO){
        if (!(await this.authorsService.getById(id)))
        throw new NotFoundException('Author not found');
  
        await this.authorsService.updateById(id, authorData );
        return { success: true };
    }
}