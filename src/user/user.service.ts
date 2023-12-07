import { HttpException, Injectable } from '@nestjs/common';
import { JsonWebTokenService } from 'src/services/jwt.service';
import { PrismaService } from 'src/services/prisma.services';
import { userDto } from './userdto/user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtSerrvice: JsonWebTokenService,
  ) {}
  async updateUser(user: any, data: userDto): Promise<any> {
    const checkUser = await this.prisma.user.findFirst({
      where: {
        id: user.id,
        is_deleted: false,
      },
    });
    if (!checkUser) {
      throw new HttpException('User not found', 404);
    }
    const updateUser = await this.prisma.user.update({
      where: { id: user.id, is_deleted: false },
      data: {
        name: data.name,
        email: data.email,
        phone_number: data.phone_number,
      },
    });
    return updateUser;
  }
}
