import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { JsonWebTokenService } from './services/jwt.service';
import { PrismaService } from './services/prisma.services';
import { UserModule } from './user/user.module';
import { AuthorModule } from './author/author.module';
import { BookModule } from './book/book.module';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [
    JwtModule.register({ secret: process.env.SECRET_KEY }),
    AuthModule,
    UserModule,
    AuthorModule,
    BookModule,
    CartModule,
  ],
  controllers: [AppController],
  providers: [AppService, JsonWebTokenService, PrismaService],
})
export class AppModule {}
