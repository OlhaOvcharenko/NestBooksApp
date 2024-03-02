import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import { Password } from '@prisma/client';
import { ConflictException, BadRequestException } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  public getAll(): Promise < User []> {
    return this.prismaService.user.findMany();
  }

  public getById(id: User ['id']): Promise<User | null> {
    return this.prismaService.user.findUnique({
      where: { id },
    });
  }

  public getByEmail(email: User ['email']): Promise<User | null> {
    return this.prismaService.user.findUnique({
      where: { email },
      include: { password: true },
    });
  }

  public async create(
    userData: Omit<User, 'id' |  'createdAt' | 'updatedAt' | 'role'>,
    password: Password['hashedPassword'],
  ): Promise<User> {

    try {
      return await this.prismaService.user.create({
        data: {
          ...userData,
          password: {
            create: {
              hashedPassword: password,
            },
          },
        },
      });
    } catch (error) {
      if (error.code === 'P2002')
      throw new ConflictException('Email is already taken');
      throw error;
    }
  }

  public async updateById(
    userId: User['id'],
    userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>,
    password?: Password['hashedPassword'],
  ): Promise<User> {
    
    try {
      if (password !== undefined) {
    
        return await this.prismaService.user.update({
          where: { id: userId },
          data: {
            ...userData,
            password: {
              update: {
                hashedPassword: password,
              },
            },
          },
        });
      } else {
  
        return await this.prismaService.user.update({
          where: { id: userId },
          data: userData,
        });
      }
    } catch (error) {
      if (error.code === 'P2025')
        throw new BadRequestException("Product doesn't exist");
      throw error;
    }
  }

  public deleteById(id: User['id']): Promise<User> {
    return this.prismaService.user.delete({
      where: { id },
    });
  }
  
}
