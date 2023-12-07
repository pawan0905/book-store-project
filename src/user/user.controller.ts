import { Body, Controller, UseGuards, Put } from '@nestjs/common';
import { AuthGuard } from 'src/guards/guards';
import { userDto } from './userdto/user.dto';
import { User } from 'src/constants/auth.decorator';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}
  @UseGuards(AuthGuard)
  @Put(':id')
  updateUser(@User() user: any, @Body() data: userDto): Promise<any> {
    return this.usersService.updateUser(user['user'], data);
  }
}
