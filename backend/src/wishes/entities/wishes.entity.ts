import { IsNumber, IsString, IsUrl, Length } from 'class-validator';
import { Offers } from 'src/offers/entities/offers.enitity';
import { User } from 'src/users/entities/user.enitity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Wishes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 250,
  })
  @Length(1, 250)
  @IsString()
  name: string;

  @Column()
  @IsString()
  link: string;

  @Column()
  @IsUrl()
  @IsString()
  image: string;

  @Column({
    type: 'numeric',
    scale: 2,
    precision: 10,
  })
  @IsNumber()
  price: number;

  @Column({
    type: 'numeric',
    scale: 2,
    precision: 10,
    default: 0,
  })
  @IsNumber()
  raised: number;

  @ManyToOne(() => User, (user) => user.wishes)
  @JoinColumn()
  owner: User;

  @OneToMany(() => Offers, (offers) => offers.item)
  @JoinColumn()
  offers: Offers[];

  @Column({
    type: 'varchar',
    length: 1024,
  })
  @Length(1, 1024)
  @IsString()
  description: string;

  @Column({
    type: 'integer',
    default: 0,
  })
  copied: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
