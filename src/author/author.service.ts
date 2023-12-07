import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.services';
import { AuthorDto, UpdateAuthorDto } from './authordto/author.dto';
import { Utility } from 'src/constants/utility';

@Injectable()
export class AuthorService {
  constructor(private readonly prisma: PrismaService) {}
  async getAuthorById(id: number): Promise<any> {
    const checkAuthor = await this.prisma.author.findFirst({
      where: {
        id: id,
        is_deleted: false,
      },
    });
    if (!checkAuthor) {
      throw new HttpException('author not found', 404);
    }
    return { data: checkAuthor };
  }
  async createAuthor(id: number, body: AuthorDto): Promise<any> {
    const checkAuthor = await this.prisma.author.findFirst({
      where: {
        id: id,
        is_deleted: false,
      },
    });
    if (Boolean(checkAuthor)) {
      throw new HttpException('auth already exists', 404);
    }
    const createAuthor = await this.prisma.author.create({
      data: {
        name: body.name,
        birth_date: body.birth_date,
        natiionality: body.nationality,
      },
    });
    return { data: 'author created successfully' };
  }
  async deleteAuthor(id: number): Promise<any> {
    const checkAuthor = await this.prisma.author.findFirst({
      where: { id: id, is_deleted: false },
    });
    if (!checkAuthor) {
      throw new HttpException('author not found', 404);
    }
    await this.prisma.author.update({
      where: { id: id },
      data: { is_deleted: true, updated_at: new Date() },
    });
    return;
  }
  async getAllAuthor(id: number, page: number, perPage: number): Promise<any> {
    console.log(id, page, perPage);
    const totalCount = await this.prisma.author.count({
      where: {
        id: id,
        is_deleted: false,
      },
    });
    console.log(totalCount);
    const list = await this.prisma.author.findMany({
      skip: page * perPage,
      take: perPage,
      where: {
        id: id,
        is_deleted: false,
      },
    });
    return Utility.getPaginatedFormatData(list, totalCount, page, perPage);
  }
  async UpdateAuthor(id: number, data: UpdateAuthorDto): Promise<any> {
    const checkAuthor = await this.prisma.author.findFirst({
      where: {
        id: id,
        is_deleted: false,
      },
    });
    if (!checkAuthor) {
      throw new HttpException('author not found', 404);
    }
    await this.prisma.author.update({
      where: { id: id },
      data: {
        name: data.name,
        natiionality: data.nationality,
      },
    });
  }
}
