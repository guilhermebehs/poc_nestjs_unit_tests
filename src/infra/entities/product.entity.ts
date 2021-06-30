import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product')
export class ProductEntity {
  constructor(id: number = null, name: string, price: number) {
    this.id = id;
    this.name = name;
    this.price = price;
  }
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  price: number;
}
