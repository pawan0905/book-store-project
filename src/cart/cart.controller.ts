import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './cartdto/cart.dto';
import { User } from 'src/constants/auth.decorator';
import { API_CONSTANTS } from 'src/constants/perpage';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}
  @Post()
  async createCart(
    @User() user: any,
    @Body() data: CreateCartDto,
  ): Promise<any> {
    return this.cartService.createCart(user['id'], data);
  }
  @Delete()
  async deleteCart(@User() user: any): Promise<any> {
    return this.cartService.deleteCart(user['id']);
  }
  @Get()
  async getCart(
    @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number,
    @Query(
      'per_page',
      new DefaultValuePipe(API_CONSTANTS.perPage),
      ParseIntPipe,
    )
    perPage: number,
    @User() user: any,
  ): Promise<any> {
    return this.cartService.getCart(user['id'], page, perPage);
  }
}
