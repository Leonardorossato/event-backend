import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Receiver } from '@/receivers/entities/receiver.entity';
import { Announcement } from '@/announcements/entities/announcement.entity';
import { Events } from './entities/events.entity';
import { TwilioModule } from 'nestjs-twilio';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Events, Receiver, Announcement]),
    TwilioModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        accountSid: config.get('TWILIO_ACCOUNT_SID'),
        authToken: config.get('TWILIO_AUTH_TOKEN'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
