import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Length, IsString, IsUrl } from 'class-validator';
import { Wishes } from 'src/wishes/entities/wishes.entity';
import { User } from 'src/users/entities/user.enitity';

@Entity()
export class Wishlists {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 250,
    nullable: true,
  })
  @Length(1, 250)
  @IsString()
  name: string;

  @Column({
    type: 'varchar',
    length: 1500,
    nullable: true,
  })
  @Length(1, 1500)
  @IsString()
  description: string;

  @Column({
    default: 'https://i.pravatar.cc/300',
  })
  @IsUrl()
  image: string;

  @ManyToMany(() => Wishes)
  @JoinTable()
  items: Wishes[];

  @ManyToOne(() => User, (user) => user.wishlists)
  owner: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
