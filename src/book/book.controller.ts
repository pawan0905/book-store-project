import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto, UpdateBookDto } from './bookdto/book.dto';
import { API_CONSTANTS } from 'src/constants/perpage';
import { AuthGuard } from 'src/guards/guards';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}
  @UseGuards(AuthGuard)
  @Post()
  async createBook(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: CreateBookDto,
  ): Promise<any> {
    return this.bookService.createBook(id, data);
  }
  @UseGuards(AuthGuard)
  @Delete(':/id')
  async deleteBook(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this.bookService.deleteBook(id);
  }
  @UseGuards(AuthGuard)
  @Put()
  async updateBook(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateBookDto,
  ): Promise<any> {
    return this.bookService.updateBook(id, data);
  }
  @Get('/:id')
  async getBookById(@Param('id') id: number): Promise<any> {
    return this.bookService.getBookById(id);
  }
  @UseGuards(AuthGuard)
  @Get()
  async getAllBooks(
    @Query('page', new DefaultValuePipe(0), ParseIntPipe)
    page: number,
    @Query(
      'per_page',
      new DefaultValuePipe(API_CONSTANTS.perPage),
      ParseIntPipe,
    )
    perPage: number,
  ): Promise<any> {
    return this.bookService.getAllBooks(page, perPage);
  }
}
