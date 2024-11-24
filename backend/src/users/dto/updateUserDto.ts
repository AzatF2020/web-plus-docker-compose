import {
  IsEmail,
  IsString,
  IsUrl,
  IsOptional,
  MinLength,
  MaxLength,
} from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export default class UpdateUserDto {
  id?: number;

  @IsOptional()
  @IsString({ message: 'validation.INVALID_STRING' })
  @MinLength(3, {
    message: i18nValidationMessage('validation.MIN_LENGTH', { value: 3 }),
  })
  @MaxLength(30, {
    message: i18nValidationMessage('validation.MAX_LENGTH', { value: 30 }),
  })
  username?: string;

  @IsOptional()
  @IsString({ message: 'validation.INVALID_STRING' })
  @IsEmail({}, { message: 'validation.INVALID_EMAIL' })
  email?: string;

  @IsOptional()
  @IsString({ message: 'validation.INVALID_STRING' })
  password?: string;

  @IsOptional()
  @IsString({ message: 'validation.INVALID_STRING' })
  about?: string;

  @IsOptional()
  @IsString({ message: 'validation.INVALID_STRING' })
  @IsUrl({}, { message: 'validation.INVALID_URL' })
  avatar?: string;
}
