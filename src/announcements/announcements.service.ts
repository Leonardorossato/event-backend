import { Receiver } from '@/receivers/entities/receiver.entity';
import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import sgMail from '@sendgrid/mail';
import axios from 'axios';
import { map } from 'rxjs';
import { Repository } from 'typeorm';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { CreateEventEmailDto } from './dto/create-evento-email.dto';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';
import { Announcement } from './entities/announcement.entity';

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
      const user = await this.announcementRepository.findOneBy({
        creatorEmail: dto.email,
      });
      if (!user) {
        throw new HttpException('Email not exists', HttpStatus.NOT_FOUND);
      }
      const apiKey = process.env.API_KEY as string;
      await sgMail.setApiKey(apiKey);

      const html = `<html><body><h1>Olá ${dto.email}</h1>
      <p>enviado: ${dto.body} </p>
      </body></html>`;

      const res =await this.mailService.sendMail({
        to: user.creatorEmail,
        from: 'leonardo.adami@globalsys.com.br',
        subject: dto.subject,
        text: dto.text,
        html: html,
      });

      return res
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
