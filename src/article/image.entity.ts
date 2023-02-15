import * as Validator from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Image {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'image_id',
    unsigned: true,
  })
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
  })
  @Validator.IsNotEmpty()
  @Validator.IsString()
  path: string;
}
