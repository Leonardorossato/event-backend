import { Announcement } from '@/announcements/entities/announcement.entity';
import { Receiver } from '@/receivers/entities/receiver.entity';
import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Repository } from 'typeorm';
import { CreateEventEmailDTO } from './dto/create-event-email.dto';
import { CreateEventSMSDTO } from './dto/create-event-sms.dto';
import { CreateEventWhatsAppDTO } from './dto/create-event-whatsapp.dto';
import { CreateEventDTO } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Events } from './entities/events.entity';
import { TwilioService } from 'nestjs-twilio';
@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Events)
    private readonly eventRepository: Repository<Events>,
    @InjectRepository(Receiver)
    private readonly receiverRepository: Repository<Receiver>,
    @InjectRepository(Announcement)
    private readonly announcementRepository: Repository<Announcement>,
    private readonly mailService: MailerService,
    private readonly twilioService: TwilioService,
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

  async createEventWhastApp(dto: CreateEventWhatsAppDTO) {
    try {
      const receiver = await this.receiverRepository.findOneBy({
        id: dto.receiverId,
      });
      if (!receiver) {
        throw new HttpException(
          `Error to find a receiver with id: ${dto.receiverId}`,
          HttpStatus.NOT_FOUND,
        );
      }
      const announcement = await this.announcementRepository.findOneBy({
        id: dto.announcementId,
      });
      if (!announcement) {
        throw new HttpException(
          `Error to find a announcement with id: ${dto.receiverId}`,
          HttpStatus.NOT_FOUND,
        );
      }
      await axios.post(
        `https://api.z-api.io/instances/${process.env.SUA_INSTANCIA}/token/${process.env.SEU_TOKEN}/send-text`,
        {
          ...dto,
        },
        {
          headers: { 'Content-Type': 'application/json' },
        },
      );
      await this.eventRepository.save(dto);
      return { message: 'Event created successfully and send to WhatsApp' };
    } catch (error) {
      throw new HttpException(
        'Erro in create a event for whatsapp',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async createEventEmail(dto: CreateEventEmailDTO) {
    try {
      const receiver = await this.receiverRepository.findOneBy({
        id: dto.receiverId,
      });
      if (!receiver) {
        throw new HttpException(
          `Error to find a receiver with id: ${dto.receiverId}`,
          HttpStatus.NOT_FOUND,
        );
      }
      const announcement = await this.announcementRepository.findOneBy({
        id: dto.announcementId,
      });
      if (!announcement) {
        throw new HttpException(
          `Error to find a announcement with id: ${dto.receiverId}`,
          HttpStatus.NOT_FOUND,
        );
      }
      const message = {
        to: [dto.email],
        subject: dto.subject,
        from: 'noreply@example.com',
        html: dto.html,
      };
      await this.mailService.sendMail(message);
      await this.eventRepository.save(dto);
      return { message: 'Event successfully created and send to email.' };
    } catch (error) {
      throw new HttpException(
        'Erro in create a event for email',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async createEventSMS(dto: CreateEventSMSDTO) {
    try {
      const receiver = await this.receiverRepository.findOneBy({
        id: dto.receiverId,
      });
      if (!receiver) {
        throw new HttpException(
          `Error to find a receiver with id: ${dto.receiverId}`,
          HttpStatus.NOT_FOUND,
        );
      }
      const announcement = await this.announcementRepository.findOneBy({
        id: dto.announcementId,
      });
      if (!announcement) {
        throw new HttpException(
          `Error to find a announcement with id: ${dto.receiverId}`,
          HttpStatus.NOT_FOUND,
        );
      }

      await this.twilioService.client.messages
        .create({
          body: dto.body,
          messagingServiceSid: process.env.TWILIO_SID,
          from: '+13467066250',
          to: dto.to,
        })
        .then((res) => {
          console.log(res.sid);
        })
        .catch((err) => {
          console.error(err);
        });
      await this.eventRepository.save(dto);
      return { message: 'Event successfully created and send so SMS.' };
    } catch (error) {
      throw new HttpException(
        'Erro in create a event for sms',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll() {
    try {
      const events = await this.eventRepository.find();
      return events;
    } catch (error) {
      throw new HttpException(
        'Error to find all events',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number) {
    try {
      const event = await this.eventRepository.findOne({ where: { id: id } });
      if (!event)
        throw new HttpException(`Event not found: ${id}`, HttpStatus.NOT_FOUND);
      return event;
    } catch (error) {
      throw new HttpException('Error to find a event', HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: number, dto: UpdateEventDto) {
    try {
      await this.eventRepository.update(id, dto);
      return { message: 'Event update successfully.' };
    } catch (error) {
      throw new HttpException('Error updating a event', HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: number) {
    try {
      const event = await this.eventRepository.findOneBy({ id: id });
      if (!event) {
        throw new HttpException(
          `Error to find a event with id: ${id}`,
          HttpStatus.NOT_FOUND,
        );
      }
      await this.eventRepository.delete(id);
      return { message: 'Event deleted successfully.' };
    } catch (error) {
      throw new HttpException(
        `Error to deleted a event with id: ${id}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
