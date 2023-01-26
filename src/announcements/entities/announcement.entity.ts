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

  @Column({ nullable: false })
  receiverId!: number;

  @Column({ nullable: false, type: 'varchar', length: 255 })
  creatorAnnouncements!: string;

  @Column({ nullable: false, type: 'varchar' })
  releasetTitle!: string;

  @Column({ nullable: false, unique: true, type: 'varchar', length: 255 })
  creatorsEmail!: string;

  @Column({ nullable: false, type: 'varchar', length: 255 })
  communiquéContent!: string;

  @CreateDateColumn({ type: Date })
  createdAt?: Date;
}
