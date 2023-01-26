import { Receiver } from '@/receivers/entities/receiver.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToMany(() => Receiver, (receiver) => receiver.id)
  @JoinColumn({ name: 'receiverId' })
  receiver?: Receiver;

  @Column({ name: 'receiverId' })
  receiverId!: number;
}
