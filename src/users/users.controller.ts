import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { Get, Param } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { Delete } from '@nestjs/common';
import { AdminAuthGuard } from 'src/auth/admin-auth.guard';
import { UseGuards } from '@nestjs/common';
import { ParseUUIDPipe } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

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

  @Delete(':id')
  @UseGuards(AdminAuthGuard)
  @UseGuards(JwtAuthGuard)
  public async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    const user = await this.usersService.getById(id);
    if (!user)
      throw new NotFoundException('User not found');
    await this.usersService.deleteById(id);
    return { success: true };
  }

}
