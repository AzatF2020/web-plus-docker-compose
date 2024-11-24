import {
  IsEmail,
  IsString,
  IsUrl,
  IsNotEmpty,
  MinLength,
  MaxLength,
} from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export default class CreateUserDto {
  @IsString({ message: 'validation.INVALID_STRING' })
  @IsNotEmpty({ message: 'validation.NOT_EMPTY' })
  @MinLength(3, {
    message: i18nValidationMessage('validation.MIN_LENGTH', { value: 3 }),
  })
  @MaxLength(30, {
    message: i18nValidationMessage('validation.MAX_LENGTH', { value: 30 }),
  })
  username: string;

  @IsString({ message: 'validation.INVALID_STRING' })
  @IsEmail({}, { message: 'validation.INVALID_EMAIL' })
  @IsNotEmpty({ message: 'validation.NOT_EMPTY' })
  email: string;

  @IsString({ message: 'validation.INVALID_STRING' })
  @IsNotEmpty({ message: 'validation.NOT_EMPTY' })
  password: string;

  @IsString({ message: 'validation.INVALID_STRING' })
  about?: string = '«Пока ничего не рассказал о себе»';

  @IsString({ message: 'validation.INVALID_STRING' })
  @IsUrl({}, { message: 'validation.INVALID_URL' })
  avatar?: string = 'https://i.pravatar.cc/300';
}
