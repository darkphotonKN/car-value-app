import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Reports {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  price: string;
}
