import { Length, IsString, IsEmail, IsUrl } from 'class-validator';
import { Wishes } from 'src/wishes/entities/wishes.entity';
import { Wishlists } from 'src/wishlists/entities/wishlists.entity';
import { Offers } from 'src/offers/entities/offers.enitity';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  OneToMany,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 30,
    nullable: false,
    unique: true,
  })
  @IsString()
  @Length(2, 30)
  username: string;

  @Column({
    type: 'varchar',
    length: 200,
    default: '«Пока ничего не рассказал о себе»',
  })
  @IsString()
  @Length(2, 200)
  about: string;

  @Column({
    default: 'https://i.pravatar.cc/300',
  })
  @IsUrl()
  avatar: string;

  @Column({
    unique: true,
    nullable: false,
  })
  @IsEmail()
  email: string;

  @Column()
  @IsString()
  password: string;

  @OneToMany(() => Wishes, (wishes) => wishes.owner)
  wishes: Wishes;

  @OneToMany(() => Wishlists, (wishlists) => wishlists.owner)
  wishlists: Wishlists;

  @OneToMany(() => Offers, (offer) => offer.user)
  offers: Offers[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
