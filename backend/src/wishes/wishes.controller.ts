import {
  Get,
  Post,
  Body,
  UseGuards,
  Req,
  Param,
  Patch,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { WishesService } from './wishes.service';
import { JwtGuard } from 'src/auth/guards/auth.guard';
import CreateWishesDto from './dto/createWishesDto';
import { UpdateWishDto } from './dto/updateWishesDto';

@Controller('wishes')
export class WishesController {
  constructor(private wishesService: WishesService) {}

  @UseGuards(JwtGuard)
  @Post()
  public async createUserWishes(
    @Body() createWishesDto: CreateWishesDto,
    @Req() request,
  ) {
    const owner = await request?.user;
    return await this.wishesService.createWishes(createWishesDto, owner);
  }

  @Get('/last')
  public async findLastWishes() {
    return await this.wishesService.findByOrder({ createdAt: 'DESC' }, 40);
  }

  @Get('/top')
  public async findTopWishes() {
    return await this.wishesService.findByOrder({ copied: 'DESC' }, 20);
  }

  @Get(':id')
  public async findOneWish(@Param('id', ParseIntPipe) id: number) {
    return await this.wishesService.findOne(id);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  public async updateWish(
    @Param('id', ParseIntPipe) id: number,
    @Req() request,
    @Body() dto: UpdateWishDto,
  ) {
    return await this.wishesService.update(id, dto);
  }

  @Post(':id/copy')
  @UseGuards(JwtGuard)
  public async copyWish(@Param('id') id: number, @Req() request) {
    const owner = await request?.user;
    return await this.wishesService.copyWish(id, owner);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  public async deleteWish(@Param('id') id: number, @Req() request) {
    const owner = await request?.user;
    return await this.wishesService.removeOne(id, owner?.id);
  }
}
