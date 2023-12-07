import { HttpException, Injectable } from '@nestjs/common';
import { JsonWebTokenService } from 'src/services/jwt.service';
import { PrismaService } from 'src/services/prisma.services';
import {
  GetAllUsersDto,
  SignupDto,
  UpdatePassword,
  signInDto,
} from './authdto/auth.dto';
import * as bcrypt from 'bcrypt';
import { Utility } from 'src/constants/utility';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JsonWebTokenService,
  ) {}
  async getSelf(data: any): Promise<any> {
    const userData = await this.prisma.user.findFirst({
      where: {
        id: data.id,
      },
    });
    console.log(userData);

    delete userData.password;
    return userData;
  }
  async signup(body: SignupDto): Promise<any> {
    const checkExist = await this.prisma.user.findFirst({
      where: {
        email: body.email,
        is_deleted: false,
      },
    });

    if (checkExist) {
      throw new HttpException('user already exists', 404);
    }
    const password = await bcrypt.hashSync(body.password, 10);
    const createdUser = await this.prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        phone_number: body.phone_number,
        password: password,
      },
    });

    const token = await this.jwtService.createJwtToken(createdUser);
    const user = await this.jwtService.verifyJwtToken(token);
    return { token, user };
  }

  async signin(body: signInDto): Promise<any> {
    const password = body.password;
    const user = await this.prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (!user) {
      throw new HttpException('User not found', 404);
    }
    const checkPassword = await bcrypt.compareSync(password, user['password']);
    if (checkPassword == true) {
      const lastLoggedIn = await this.prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          last_logged_in_at: new Date(),
        },
      });
      const token = await this.jwtService.createJwtToken(user);
      const user_data = {
        name: user.name,
        email: user.email,
        phone_number: user.phone_number,
        id: user.id,
      };
      return { token, user_data };
    } else {
      throw new HttpException('user not found', 404);
    }
  }
  async updatePassword(data: UpdatePassword, userObject: any): Promise<any> {
    const user = await this.prisma.user.findFirst({
      where: {
        id: userObject.id,
      },
    });
    if (!Boolean(user)) {
      throw new HttpException('user not found ', 404);
    }
    const checkPassword = await bcrypt.compareSync(
      data.old_password,
      user.password,
    );
    if (!checkPassword) {
      throw new HttpException('old password did not match ', 400);
    }
    if (data.new_password !== data.confirm_password) {
      throw new HttpException(
        'new password and confirm password did not match',
        400,
      );
    }
    const password = await bcrypt.hashSync(data.new_password, 10);
    await this.prisma.user.update({
      where: {
        email: user.email,
      },
      data: {
        password: password,
        updated_at: new Date(),
      },
    });
    return true;
  }
  async getAllUsers(data: GetAllUsersDto): Promise<any> {
    const totalCount = await this.prisma.user.count();
    const list = await this.prisma.user.findMany({
      skip: data.page * data.perPage,
      take: data.perPage,
    });
    console.log(list);
    return Utility.getPaginatedFormatData(
      list,
      totalCount,
      data.page,
      data.perPage,
    );
  }
}
