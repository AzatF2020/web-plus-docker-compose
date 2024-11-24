import { IsArray, IsString, IsUrl, IsNotEmpty } from 'class-validator';
import { Wishes } from 'src/wishes/entities/wishes.entity';

export class CreateWishlistDto {
  @IsString({ message: 'validation.INVALID_STRING' })
  @IsNotEmpty({ message: 'validation.NOT_EMPTY' })
  name: string;

  @IsUrl({}, { message: 'validation.INVALID_URL' })
  image: string = 'https://i.pravatar.cc/300';

  @IsArray({ message: 'validation.INVALID_ARRAY' })
  itemsId: number[] | Wishes[] = [];
}
