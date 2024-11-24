import { IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateWishlistDto {
  @IsString({ message: 'validation.INVALID_STRING' })
  @IsOptional()
  name: string;

  @IsUrl({}, { message: 'validation.INVALID_URL' })
  @IsOptional()
  image: string;

  @IsString({ message: 'validation.INVALID_STRING' })
  @IsOptional()
  description: string;

  @IsOptional()
  itemsId: number[] = [];
}
