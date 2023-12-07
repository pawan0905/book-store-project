import { Module } from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorController } from './author.controller';
import { PrismaService } from 'src/services/prisma.services';

@Module({
  providers: [AuthorService, PrismaService],
  controllers: [AuthorController],
})
export class AuthorModule {}
