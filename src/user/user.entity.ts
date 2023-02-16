import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import * as Validator from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'user_id',
    unsigned: true,
  })
  id: number;

  @Column({
    type: 'varchar',
    unique: true,
    length: 128,
  })
  @Validator.IsString()
  @Validator.IsNotEmpty()
  username: string;

  @Column({
    type: 'varchar',
    name: 'password_hash',
    length: 128,
  })
  @Validator.IsNotEmpty()
  @Validator.IsHash('sha512')
  password: string;
}
