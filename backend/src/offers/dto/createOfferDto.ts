import { IsBoolean, IsNumber } from 'class-validator';

export default class CreateOfferDto {
  @IsNumber({}, { message: 'validation.INVALID_NUMBER' })
  amount: number;

  @IsBoolean({ message: 'validation.INVALID_BOOLEAN' })
  hidden: boolean;

  @IsNumber({}, { message: 'validation.INVALID_NUMBER' })
  itemId: number;
}
