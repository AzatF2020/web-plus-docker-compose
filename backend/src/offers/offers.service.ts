import { BadRequestException, Injectable } from '@nestjs/common';
import { Offers } from './entities/offers.enitity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.enitity';
import CreateOfferDto from './dto/createOfferDto';
import { WishesService } from 'src/wishes/wishes.service';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offers)
    private offerRepository: Repository<Offers>,
    private wishesService: WishesService,
    private i18nService: I18nService,
  ) {}

  async create(dto: CreateOfferDto, user: User) {
    const wish = await this.wishesService.findOne(dto.itemId);
    const donation = Number(wish.raised) + dto.amount;

    if (wish?.owner?.id === user?.id) {
      throw new BadRequestException(
        this.i18nService.t('offers.CONTRIBUTE_OWN_MONEY'),
      );
    }

    if (donation > wish.price) {
      throw new BadRequestException(
        this.i18nService.t('offers.DONATION_EXCEED'),
      );
    }

    await this.wishesService.update(wish.id, {
      raised: donation,
    });

    return await this.offerRepository.save({ ...dto, user, item: wish });
  }

  async findOne(id: number) {
    return await this.offerRepository.findBy({ id });
  }

  async findMany() {
    return await this.offerRepository.find();
  }
}
