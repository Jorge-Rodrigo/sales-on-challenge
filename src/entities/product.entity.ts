import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Sale } from "./sale.entity";

@Entity("product")
class Product {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ length: 78 })
  name: string;

  @Column({ type: "decimal" })
  price: number;

  @Column({ type: "int", default: 1 })
  amount: number;

  @ManyToOne(() => Sale)
  sale: Sale;
}

export { Product };
