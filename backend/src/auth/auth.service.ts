import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from 'src/users/entities/user.enitity';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { I18n, I18nService } from 'nestjs-i18n';

@Injectable()
export class AuthService {
  constructor(
    private i18nService: I18nService,
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.findByUsername(username);

    if (!user) {
      throw new UnauthorizedException(
        this.i18nService.t('auth.LOGIN_OR_PASSWORD_INCORRECT'),
      );
    }

    const isPasswordCorrect = await compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new UnauthorizedException(
        this.i18nService.t('auth.LOGIN_OR_PASSWORD_INCORRECT'),
      );
    }

    return user;
  }

  async auth(user: User) {
    const payload = { sub: user.id };

    return { access_token: this.jwtService.sign(payload) };
  }
}
