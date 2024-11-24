import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Wishlists } from './entities/wishlists.entity';
import { WishesService } from 'src/wishes/wishes.service';
import { User } from 'src/users/entities/user.enitity';
import { CreateWishlistDto } from './dto/createWishlistsDto';
import { UpdateWishlistDto } from './dto/updateWishlistsDto';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlists)
    private wishlistsRepository: Repository<Wishlists>,
    private wishesService: WishesService,
    private i18nService: I18nService,
  ) {}

  public async findAllWishlists() {
    return await this.wishlistsRepository.find({
      relations: { items: true, owner: true },
    });
  }

  public async findOne(id: number) {
    return await this.wishlistsRepository.findOne({
      where: { id },
      relations: { items: true, owner: true },
    });
  }

  public async createWishlists(dto: CreateWishlistDto, owner: User) {
    const wishesId = dto?.itemsId?.map((id) => id);
    const allWishes = await this.wishesService.findAllById(wishesId);

    return await this.wishlistsRepository.save({
      ...dto,
      owner,
      items: allWishes,
    });
  }

  public async updateOne(id: number, dto: UpdateWishlistDto, owner: User) {
    const wishlist = await this.wishlistsRepository.findOne({
      where: { id },
      relations: { owner: true, items: true },
    });
    const wishlistOwnerId = wishlist?.owner;

    if (wishlistOwnerId?.id !== owner?.id) {
      throw new ForbiddenException({
        message: this.i18nService.t(
          'wishlists.WISHLISTS_UPDATE_FOREIGN_CONFLICT',
        ),
      });
    }

    const dtoWishlistWishesIds = dto.itemsId;
    const allWishlistWishes =
      await this.wishesService.findAllById(dtoWishlistWishesIds);

    await this.wishlistsRepository.save({
      ...dto,
      id: wishlist.id,
      items: allWishlistWishes ?? wishlist.items,
    });

    return await this.wishlistsRepository.findOne({
      where: { id },
      relations: { items: true },
    });
  }

  public async removeOne(id: number, owner: User) {
    const wishlist = await this.wishlistsRepository.findOne({
      where: { id },
      relations: { owner: true },
    });
    const wishlistOwnerId = wishlist?.owner;

    if (wishlistOwnerId?.id !== owner?.id) {
      throw new ForbiddenException({
        message: this.i18nService.t(
          'wishlists.WISHLISTS_UPDATE_FOREIGN_CONFLICT',
        ),
      });
    }

    return await this.wishlistsRepository.remove(wishlist);
  }
}
