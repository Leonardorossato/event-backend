import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Receiver {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false, type: 'varchar', length: 255 })
  fullName!: string;

  @Column({ nullable: false, unique: true, type: 'varchar', length: 255 })
  email!: string;

  @Column({ nullable: false, type: 'varchar', length: 255 })
  whatsapp!: string;

  @Column({ nullable: false, type: 'varchar', length: 14 })
  cellphone!: string;

  @Column({ nullable: false, type: 'varchar', length: 255 })
  message!: string;

  @CreateDateColumn({ type: Date })
  createdAt?: Date;
}
