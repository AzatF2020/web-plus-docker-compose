import {
  Controller,
  Get,
  Req,
  UseGuards,
  Post,
  Param,
  Patch,
  Body,
  Delete,
} from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { JwtGuard } from 'src/auth/guards/auth.guard';
import { CreateWishlistDto } from './dto/createWishlistsDto';
import { UpdateWishlistDto } from './dto/updateWishlistsDto';

@Controller('wishlists')
export class WishlistsController {
  constructor(private wishlistsService: WishlistsService) {}

  @Get()
  public async getAllWishlists() {
    return await this.wishlistsService.findAllWishlists();
  }

  @UseGuards(JwtGuard)
  @Post()
  public async createWishlists(@Body() dto: CreateWishlistDto, @Req() request) {
    const owner = await request?.user;
    return await this.wishlistsService.createWishlists(dto, owner);
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  public async getOneWishlist(@Param('id') id: number) {
    return await this.wishlistsService.findOne(id);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  public async updateWishlist(
    @Param('id') id: number,
    @Req() request,
    @Body() dto: UpdateWishlistDto,
  ) {
    const owner = await request?.user;
    return await this.wishlistsService.updateOne(id, dto, owner);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  public async removeWishlist(@Param('id') id: number, @Req() request) {
    const owner = await request?.user;
    return await this.wishlistsService.removeOne(id, owner);
  }
}
