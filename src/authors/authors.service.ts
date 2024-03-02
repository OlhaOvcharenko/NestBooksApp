import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma.service';
import { Author } from '@prisma/client';


@Injectable()
export class AuthorsService {
  constructor(private prismaService: PrismaService) {}

  public getAll(): Promise<Author []> {
    return this.prismaService.author.findMany();
  }

  public getById(id: Author['id']): Promise<Author | null> {
    return this.prismaService.author.findUnique({
      where: { id },
    });
  }

  public deleteById(id: Author['id']): Promise<Author> {
    return this.prismaService.author.delete({
      where: { id },
    });
  }

  public create(authorData: Omit<Author, 'id'>,): Promise <Author> {
    return this.prismaService.author.create({
      data: authorData,
    });
  }

  public updateById (id: Author['id'], 
    authorData: Omit<Author, 'id'>,) : Promise <Author> {
      return this.prismaService.author.update({
        where: { id },
        data: authorData,
    });
  }

}
