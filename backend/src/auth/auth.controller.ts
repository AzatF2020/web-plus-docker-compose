import { Body, Controller, Post, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import CreateUserDto from 'src/users/dto/createUserDto';
import { LocalGuard } from './guards/local.guard';

@Controller()
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @UseGuards(LocalGuard)
  @Post('/signin')
  async signIn(@Req() request) {
    return await this.authService.auth(request?.user);
  }

  @Post('/signup')
  async signUp(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    return await this.authService.auth(user);
  }
}
