import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.enitity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { WishesModule } from 'src/wishes/wishes.module';

@Module({
  imports: [WishesModule, TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
