import { InjectRepository } from '@nestjs/typeorm';
import { ConflictException, Injectable } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { User } from './entities/user.enitity';
import { hash } from 'bcrypt';
import CreateUserDto from './dto/createUserDto';
import UpdateUserDto from './dto/updateUserDto';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private i18nService: I18nService,
  ) {}

  async findById(id: number) {
    return await this.userRepository.findOne({
      where: { id },
      relations: {
        wishes: true,
      },
    });
  }

  async findByUsername(username: string) {
    return await this.userRepository.findOne({
      where: { username },
    });
  }

  async findBy(key: string, param: string) {
    return await this.userRepository.findOne({
      where: { [key]: param },
    });
  }

  async update(user: User, updateUserDto: UpdateUserDto) {
    const { id } = user;
    const dto = updateUserDto;

    if (dto.password) {
      dto.password = await hash(dto.password, 6);
    }

    await this.userRepository.update(id, dto as Partial<User>);

    const { password, ...candidate } = await this.userRepository.findOne({
      where: { id },
    });

    return candidate;
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, username, ...rest } = createUserDto;
      const user = await this.userRepository.findOne({ where: { username } });

      if (user) {
        throw new ConflictException(
          this.i18nService.t('auth.USER_ALREADY_EXISTS', {
            args: {
              value: user?.username,
            },
          }),
        );
      }

      const hashPassword = await hash(password, 6);

      return await this.userRepository.save({
        ...rest,
        username,
        password: hashPassword,
      });
    } catch (err) {
      console.log(err);
    }
  }

  async findMany(query: string) {
    const users = await this.userRepository.find({
      where: [{ username: Like(`%${query}%`) }, { email: Like(`%${query}%`) }],
    });
    return users;
  }

  async findUsersWithWishes(id: number) {
    const { wishes } = await this.userRepository.findOne({
      where: { id },
      relations: { wishes: true, wishlists: true, offers: true },
    });
    return wishes;
  }
}
