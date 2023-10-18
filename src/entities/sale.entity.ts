import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Client } from "./client.entity";
import { Product } from "./product.entity";

@Entity("sale")
class Sale {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @OneToOne(() => Client, { nullable: true })
  @JoinColumn()
  client: Client | null;

  @OneToMany(() => Product, (product) => product.sale)
  products: Product[];

  @Column({ type: "decimal" })
  totalPrice: number;

  @Column({ length: 100 })
  paymentMethod: string;

  @Column({ type: "int", default: 0 })
  portion: number;

  @CreateDateColumn({ type: "date" })
  createdAt: string | Date;

  @UpdateDateColumn({ type: "date" })
  updatedAt: string | Date | null;
}

export { Sale };