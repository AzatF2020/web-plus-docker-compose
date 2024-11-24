import { IsNumber, IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateWishDto {
  @IsString({ message: 'validation.INVALID_STRING' })
  @IsOptional()
  name?: string;

  @IsString({ message: 'validation.INVALID_STRING' })
  @IsUrl({}, { message: 'validation.INVALID_URL' })
  @IsOptional()
  link?: string;

  @IsString({ message: 'validation.INVALID_STRING' })
  @IsOptional()
  image?: string;

  @IsNumber({}, { message: 'validation.INVALID_NUMBER' })
  @IsOptional()
  price?: number;

  @IsNumber({}, { message: 'validation.INVALID_NUMBER' })
  @IsOptional()
  raised?: number;

  @IsString({ message: 'validation.INVALID_STRING' })
  @IsOptional()
  description?: string;
}
