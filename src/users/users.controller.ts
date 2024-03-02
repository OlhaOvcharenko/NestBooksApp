import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { Get, Param } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/')
  async getAll() {
    return this.usersService.getAll();
  }

  @Get('/:id')
  async getById(@Param('id') id: string) {
    const user = await this.usersService.getById(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
}
