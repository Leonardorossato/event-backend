import { Announcement } from '@/announcements/entities/announcement.entity';
import { Receiver } from '@/receivers/entities/receiver.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEventDTO } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Events } from './entities/event.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Events)
    private readonly eventRepository: Repository<Event>,
    @InjectRepository(Receiver)
    private readonly receiverRepository: Repository<Receiver>,
    @InjectRepository(Announcement)
    private readonly announcementRepository: Repository<Announcement>,
  ) {}
  async create(dto: CreateEventDTO) {
    try {
      const event = await this.eventRepository.create(dto);
      await this.eventRepository.save(event);
      return event;
    } catch (error) {
      throw new HttpException('Error creating event', HttpStatus.BAD_REQUEST);
    }
  }

  findAll() {
    return `This action returns all events`;
  }

  findOne(id: number) {
    return `This action returns a #${id} event`;
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    return `This action updates a #${id} event`;
  }

  remove(id: number) {
    return `This action removes a #${id} event`;
  }
}
