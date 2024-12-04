import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Req,
  UseGuards,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtGuard } from 'src/auth/guards/auth.guard';
import { WishesService } from 'src/wishes/wishes.service';
import UpdateUserDto from './dto/updateUserDto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly wishesService: WishesService,
  ) {}

  @Post('/find')
  public async findUsers(@Body('query') query: string) {
    return this.userService.findMany(query);
  }

  @UseGuards(JwtGuard)
  @Get('/me')
  async getMeInfo(@Req() request) {
    const userId = await request.user.id;
    return this.userService.findById(userId);
  }

  @UseGuards(JwtGuard)
  @Get('/me/wishes')
  async getMyWishes(@Req() request) {
    const userId = await request.user.id;
    return await this.userService.findUsersWithWishes(userId);
  }

  @UseGuards(JwtGuard)
  @Patch('/me')
  async updateMeInfo(@Req() request, @Body() dto: UpdateUserDto) {
    const user = await request.user;
    return this.userService.update(user, dto);
  }

  @UseGuards(JwtGuard)
  @Get(':username')
  async findUserByUsername(@Param() params: { username: string }) {
    const username = params?.username;
    return this.userService.findBy('username', username);
  }

  @Get(':username/wishes')
  public async getUsersWishes(@Param('username') username) {
    return this.wishesService.findMany('owner', { username });
  }
}
