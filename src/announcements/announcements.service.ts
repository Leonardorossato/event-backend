import { Receiver } from '@/receivers/entities/receiver.entity';
import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Repository } from 'typeorm';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { CreateEventEmailDto } from './dto/create-evento-email.dto';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';
import { Announcement } from './entities/announcement.entity';
import nodemailer from '@nestjs-modules/mailer';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });
@Injectable()
export class AnnouncementsService {
  constructor(
    @InjectRepository(Announcement)
    private readonly announcementRepository: Repository<Announcement>,
    @InjectRepository(Receiver)
    private readonly receiverRepository: Repository<Receiver>,
    private readonly mailService: MailerService,
  ) {}
  async create(dto: CreateAnnouncementDto) {
    try {
      const announcement = await this.announcementRepository.create(dto);
      await this.announcementRepository.save(announcement);
      return announcement;
    } catch (error) {
      throw new HttpException(
        'Erro to create a announcement',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async createEventByWhastApp(dto: CreateAnnouncementDto) {
    try {
      const result = await axios.post(
        `https://api.z-api.io/instances/${process.env.SUA_INSTANCIA}/token/${process.env.SEU_TOKEN}/send-messages`,
        {
          ...dto,
        },
        {
          headers: { 'Content-Type': 'application/json' },
        },
      );
      return result.data;
    } catch (error) {
      throw new HttpException(
        'Erro in create a event for whatsapp',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async createEventByEmail(dto: CreateEventEmailDto) {
    try {
      const message = {
        to: [dto.email],
        text: dto.text,
        subject: dto.subject,
        from: 'noreply@example.com',
        html: '<h1>Teste aqui</h1>',
      };
      const result = await this.mailService.sendMail(message);
      return result;
    } catch (error) {
      throw new HttpException(
        'Error to create a event for email',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll() {
    try {
      const announcement = await this.announcementRepository.find();
      return announcement;
    } catch (error) {
      throw new HttpException(
        'Error to find all announcement',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number) {
    return `This action returns a #${id} announcement`;
  }

  async update(id: number, dto: UpdateAnnouncementDto) {
    try {
      const receiver = await this.announcementRepository.findOneBy({
        id: dto.receiverId,
      });
      if (!receiver)
        throw new HttpException(
          `Error to find receiver with id: ${dto.receiverId}`,
          HttpStatus.NOT_FOUND,
        );
      const announcement = await this.announcementRepository.findOneBy({
        id: id,
      });
      if (!announcement)
        throw new HttpException(
          `Error to find announcement with id: ${id}`,
          HttpStatus.NOT_FOUND,
        );
      await this.announcementRepository.update(id, dto);
      return { message: 'Announcement successfully updated.' };
    } catch (error) {
      throw new HttpException(
        'Error to updated a announcement',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async remove(id: number) {
    try {
      const announcement = await this.announcementRepository.findOneBy({
        id: id,
      });
      if (!announcement)
        throw new HttpException(
          `Error to find announcement with id: ${id}`,
          HttpStatus.NOT_FOUND,
        );
      await this.announcementRepository.delete(id);
      return { message: 'Announcement deleted successfully.' };
    } catch (error) {
      throw new HttpException(
        `Error to remove announcement with id: ${id}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
