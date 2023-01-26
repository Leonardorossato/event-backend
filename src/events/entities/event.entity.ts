import { Announcement } from '@/announcements/entities/announcement.entity';
import { Receiver } from '@/receivers/entities/receiver.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Events {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToMany(() => Receiver, (receiver) => receiver.id)
  @JoinColumn({ name: 'receiverId' })
  receiver?: Receiver;

  @Column({ name: 'receiverId' })
  receiverId!: number;

  @OneToMany(() => Announcement, (announcement) => announcement.id)
  @JoinColumn({ name: 'announcementId' })
  announcements?: Announcement;

  @Column({ name: 'announcementId' })
  announcementId!: number;

  @CreateDateColumn({ type: Date })
  createdAt!: Date;
}
