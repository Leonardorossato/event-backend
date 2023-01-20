import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Announcement {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({nullable: false})
  receiverId!: number; 

  @Column({ nullable: false, type: 'varchar', length: 255 })
  creatorAnnouncement!: string;

  @Column({ nullable: false, unique: true, type: 'varchar', length: 255 })
  creatorEmail!: string;

  @Column({ nullable: false, type: 'varchar', length: 255 })
  communiqContent!: string;

  @CreateDateColumn({ type: Date })
  createdAt?: Date;
}
