import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("client")
class Client {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ length: 78 })
  name: string;
}

export { Client };
