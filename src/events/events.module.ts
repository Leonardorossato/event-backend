import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Receiver } from '@/receivers/entities/receiver.entity';
import { Announcement } from '@/announcements/entities/announcement.entity';
import { Events } from './entities/events.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Events, Receiver, Announcement])],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
