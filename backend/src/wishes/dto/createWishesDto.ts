import { IsNumber, IsString, IsUrl } from 'class-validator';

export default class CreateWishesDto {
  @IsString({ message: 'validation.INVALID_STRING' })
  name: string;

  @IsString({ message: 'validation.INVALID_STRING' })
  @IsUrl({}, { message: 'validation.INVALID_URL' })
  link: string;

  @IsString({ message: 'validation.INVALID_STRING' })
  image: string;

  @IsNumber({}, { message: 'validation.INVALID_NUMBER' })
  price: number;

  @IsString({ message: 'validation.INVALID_STRING' })
  description: string;
}
