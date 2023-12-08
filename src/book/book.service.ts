import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.services';
import { CreateBookDto, UpdateBookDto } from './bookdto/book.dto';
import { JsonWebTokenService } from 'src/services/jwt.service';
import { Utility } from 'src/constants/utility';

@Injectable()
export class BookService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JsonWebTokenService,
  ) {}
  async createBook(id: number, data: CreateBookDto): Promise<any> {
    const checkedBook = await this.prisma.book.findFirst({
      where: { id: id, is_deleted: false },
    });
    if (Boolean(checkedBook)) {
      throw new HttpException('book already exists', 404);
    }
    const createBook = await this.prisma.book.create({
      data: {
        title: data.title,
        author_id: data.author_id,
        genre: data.genre,
        publication_date: data.publication_date,
        price: data.price,
        quantity: data.quantity,
        category: data.category,
      },
    });
    return { data: 'book created successfully' };
  }
  async getBookById(id: number): Promise<any> {
    const checkeBook = await this.prisma.book.findFirst({
      where: { id: id, is_deleted: false },
    });
    if (!checkeBook) {
      throw new HttpException('book not found', 404);
    }
    return checkeBook;
  }
  async deleteBook(id: number): Promise<any> {
    const checkeBook = await this.prisma.book.findFirst({
      where: { id: id, is_deleted: false },
    });
    if (!checkeBook) {
      throw new HttpException('book not found', 404);
    }
    const deleteBook = await this.prisma.book.update({
      where: { id: id },
      data: {
        is_deleted: true,
        updated_at: new Date(),
      },
    });
    return;
  }
  async updateBook(id: number, data: UpdateBookDto): Promise<any> {
    const checkeBook = await this.prisma.book.findFirst({
      where: { id: id, is_deleted: false },
    });
    if (!checkeBook) {
      throw new HttpException('book not found', 404);
    }
    const updatedBook = await this.prisma.book.update({
      where: { id: id },
      data: {
        title: data.title,
        genre: data.genre,
        publication_date: data.publication_date,
        price: data.price,
        category: data.category,
      },
    });
    return updatedBook;
  }
  async getAllBooks(page: number, perPage: number): Promise<any> {
    const totalCount = await this.prisma.book.count({
      where: {
        is_deleted: false,
      },
    });
    const list = await this.prisma.book.findMany({
      take: perPage,
      skip: page * perPage,
      where: {
        is_deleted: false,
      },
    });
    const data = await Promise.all(
      list.map(async (item) => {
        return {
          id: item.id,
          author_id: item.author_id,
          title: item.title,
          genre: item.genre,
          price: item.price,
          publication_date: item.publication_date,
          qunatity: item.quantity,
        };
      }),
    );
    return Utility.getPaginatedFormatData(data, totalCount, page, perPage);
  }
}
