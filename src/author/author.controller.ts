import {
  Controller,
  Get,
  ParseIntPipe,
  Param,
  Query,
  DefaultValuePipe,
  Body,
  Post,
  Delete,
  Put,
} from '@nestjs/common';
import { AuthorService } from './author.service';
import { API_CONSTANTS } from 'src/constants/perpage';
import { AuthorDto, UpdateAuthorDto } from './authordto/author.dto';

@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}
  @Get('/:id')
  async getAuthorById(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this.getAuthorById(id);
  }
  @Get()
  async getAllAuthor(
    @Query('page', new DefaultValuePipe(0), ParseIntPipe)
    page: number,
    @Query(
      'per_page',
      new DefaultValuePipe(API_CONSTANTS.perPage),
      ParseIntPipe,
    )
    perPage: number,
    id: number,
  ): Promise<any> {
    return this.authorService.getAllAuthor(id, page, perPage);
  }
  @Post()
  async createAuthor(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: AuthorDto,
  ): Promise<any> {
    return this.authorService.createAuthor(id, data);
  }
  @Delete('/:id')
  async deleteAuthor(@Param('id') id: number): Promise<any> {
    return this.authorService.deleteAuthor(id);
  }
  @Put('/:id')
  async updateAuthor(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateAuthorDto,
  ): Promise<any> {
    return this.authorService.UpdateAuthor(id, data);
  }
}
