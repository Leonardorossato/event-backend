import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Receiver {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string
}
