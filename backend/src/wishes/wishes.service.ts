import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FindOptionsOrder, In, Repository } from 'typeorm';
import { Wishes } from './entities/wishes.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.enitity';
import CreateWishesDto from './dto/createWishesDto';
import { UpdateWishDto } from './dto/updateWishesDto';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wishes)
    private wishesRepository: Repository<Wishes>,
    private i18nService: I18nService,
  ) {}

  public async createWishes(dto: CreateWishesDto, owner: User) {
    return await this.wishesRepository.save({ ...dto, owner });
  }

  public async findAllById(ids: number[]) {
    return await this.wishesRepository.findBy({
      id: In(ids),
    });
  }

  public async findOne(id: number) {
    const wish = await this.wishesRepository.findOne({
      where: { id },
      relations: ['owner', 'offers', 'offers.user'],
    });

    if (!wish) throw new NotFoundException();

    return wish;
  }

  public async findMany(key: string, param: any) {
    return await this.wishesRepository.findBy({
      [key]: param,
    });
  }

  public async removeOne(id: number, userId: number) {
    const wish = await this.findOne(id);

    if (wish?.owner?.id !== userId) {
      throw new NotFoundException(this.i18nService.t('wishes.WISH_NOT_FOUND'));
    }

    if (wish.offers.length) {
      throw new BadRequestException(
        this.i18nService.t('wishes.WISH_CANT_REMOVE'),
      );
    }

    return await this.wishesRepository.remove(wish);
  }

  public async update(id: number, dto: UpdateWishDto) {
    const wish = await this.wishesRepository.findOneBy({ id });

    await this.wishesRepository.update(id, dto);
    return wish;
  }

  public async findByOrder(order: FindOptionsOrder<Wishes>, limit: number) {
    return this.wishesRepository.find({
      take: limit,
      order: order,
      relations: { owner: true },
    });
  }

  public async copyWish(wishId: number, user: User) {
    const { id, createdAt, updatedAt, copied, raised, offers, ...dataWish } =
      await this.wishesRepository.findOne({
        where: { id: wishId },
        relations: { owner: true },
      });

    if (dataWish.owner.id === user.id) {
      throw new ConflictException({
        message: this.i18nService.t('wishes.COPY_OWN_WISH'),
      });
    }

    await this.wishesRepository.update(id, { copied: copied + 1 });
    return this.wishesRepository.save({
      ...dataWish,
      owner: user,
    });
  }
}
