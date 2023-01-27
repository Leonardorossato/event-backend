import { Announcement } from '@/announcements/entities/announcement.entity';
import { Receiver } from '@/receivers/entities/receiver.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Events {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToMany(() => Receiver)
  @JoinColumn({ name: 'receiverId' })
  receiver!: Receiver;

  @Column({ nullable: false })
  receiverId!: number;

  @ManyToMany(() => Announcement)
  @JoinColumn({ name: 'announcementId' })
  announcements!: Announcement;

  @Column({ nullable: false })
  announcementId!: number;

  @CreateDateColumn({ type: Date })
  createdAt?: Date;
}
