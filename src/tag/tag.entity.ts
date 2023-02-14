import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import * as Validator from 'class-validator';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Validator.IsString()
  @Validator.IsNotEmpty()
  tagName: string;
}
