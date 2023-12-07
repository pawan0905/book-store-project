import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.services';
import { CreateCartDto } from './cartdto/cart.dto';
import { Utility } from 'src/constants/utility';

@Injectable()
export class CartService {
  constructor(private readonly prisma: PrismaService) {}
  async createCart(id: number, data: CreateCartDto) {
    const cartExists = await this.prisma.cart.findFirst({
      where: {
        user_id: id,
        is_deleted: false,
      },
    });
    if (Boolean(cartExists)) {
      const cart_details = await this.prisma.cart_details.findFirst({
        where: {
          book_id: data.book_id,
          is_deleted: false,
          cart_id: cartExists.id,
        },
      });
      if (Boolean(cart_details)) {
        const updateCart = await this.prisma.cart_details.update({
          where: {
            id: cart_details.id,
            is_deleted: false,
          },
          data: {
            quantity: data.quantity,
            price: data.price,
          },
        });
      } else {
        const book = await this.prisma.cart_details.create({
          data: {
            book_id: data.book_id,
            quantity: data.quantity,
            price: data.price,
            cart_id: cartExists.id,
          },
        });
      }
    } else {
      const createCart = await this.prisma.cart.create({
        data: {
          user_id: id,
        },
      });
      const cart_details = await this.prisma.cart_details.create({
        data: {
          book_id: data.book_id,
          cart_id: createCart.id,
          quantity: data.quantity,
          price: data.price,
        },
      });
    }
    return { data: 'book added to cart successfully' };
  }
  async deleteCart(user_id: number): Promise<any> {
    const checkCart = await this.prisma.cart.findFirst({
      where: {
        user_id: user_id,
        is_deleted: false,
      },
    });
    const deleteCart = await this.prisma.cart_details.updateMany({
      where: {
        cart_id: checkCart.id,
      },
      data: { is_deleted: true, updated_at: new Date() },
    });
    return { data: 'cart removed successfully' };
  }
  async getCart(user_id: number, page: number, perPage: number): Promise<any> {
    const cart = await this.prisma.cart.findFirst({
      where: { user_id: user_id, is_deleted: false },
    });
    const totalCount = await this.prisma.cart_details.count({
      where: {
        cart_id: cart.id,
        is_deleted: false,
      },
    });
    const list = await this.prisma.cart_details.findMany({
      where: {
        cart_id: cart.id,
        is_deleted: false,
        quantity: {
          gt: 0,
        },
      },

      skip: page * perPage,
      take: perPage,
    });
    return Utility.getPaginatedFormatData(totalCount, list, page, perPage);
  }
}
