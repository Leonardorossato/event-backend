import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Receiver {
    @PrimaryGeneratedColumn()
    id!: number;
}
