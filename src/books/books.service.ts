import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Book } from '@prisma/client';
import { ConflictException } from '@nestjs/common';
import{ UserOnBooks } from '@prisma/client';


@Injectable()
export class BooksService {
  constructor(private prismaService: PrismaService) {}

  public getAll (): Promise<Book[]> {
    return this.prismaService.book.findMany({ include: { author: true } });
  }

  public getById (id: Book['id']): Promise<Book | null> {
    return this.prismaService.book.findUnique({
      where: { id },
      include: { author: true },
    });
  }

  public deleteById (id: Book['id']): Promise<Book> {
    return this.prismaService.book.delete({
      where: { id },
    });
  }

  public async create (
    bookData: Omit<Book, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Book> {
    const { authorId, ...otherData } = bookData;
    try {
      return await this.prismaService.book.create({
        data: {
          ...otherData,
          author: {
            connect: { id: authorId },
          },
        },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        // Jeśli wystąpił konflikt unikalności na tytule książki
        throw new ConflictException("Book with the same title already exists");
      }
      throw error; // Rzuć inne błędy dalej
    }
  }

  public updateById (
    id: Book['id'],
    bookData: Omit<Book, 'id' | 'createdAt' | 'updatedAt'>,
  ):Promise<Book> {
    const { authorId, ...otherData } = bookData;
    return this.prismaService.book.update({
      where: { id },
      data: {
        ...otherData,
        author: {
          connect: { id: authorId },
        }
      },
   });
  }
 

  public async likeBook (
    favoriteBook: Omit<UserOnBooks, 'id'>
    ) : Promise<Book> 
    {
    const {bookId, userId} = favoriteBook
    return await this.prismaService.book.update({
      where: { id: bookId },
      data: {
        users: {
          create: {
            user: {
              connect: { id: userId },
            },
          },
        },
      },
    });
  }

}