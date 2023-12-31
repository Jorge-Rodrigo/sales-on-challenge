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

  @OneToOne(() => Client, { nullable: true, onDelete: "CASCADE" })
  @JoinColumn()
  client: Client | null;

  @OneToMany(() => Product, (product) => product.sale, { onDelete: "CASCADE" })
  products: Product[];

  @Column({ type: "decimal" })
  totalPrice: number;

  @Column({ length: 100 })
  paymentMethod: string;

  @Column({ type: "int", default: 1 })
  portion: number | null;

  @Column({ type: "decimal" })
  installmentPrice: number | null;

  @Column("simple-array", { nullable: true })
  customDueDates: string[] | null | undefined;

  @Column("simple-array", { nullable: true })
  customInstallmentPrice: number[] | null | undefined;

  @CreateDateColumn({ type: "date" })
  createdAt: string | Date;

  @UpdateDateColumn({ type: "date" })
  updatedAt: string | Date | null;
}

export { Sale };
