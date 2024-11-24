import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/auth.guard';
import { OffersService } from './offers.service';
import CreateOfferDto from './dto/createOfferDto';

@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @UseGuards(JwtGuard)
  @Post()
  create(@Body() dto: CreateOfferDto, @Req() req) {
    return this.offersService.create(dto, req.user);
  }

  @UseGuards(JwtGuard)
  @Get()
  getAll() {
    return this.offersService.findMany();
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.offersService.findOne(id);
  }
}
