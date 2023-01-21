import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';
import { Announcement } from './entities/announcement.entity';

@Injectable()
export class AnnouncementsService {
  constructor(
    @InjectRepository(Announcement)
    private readonly announcementRepository: Repository<Announcement>,
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

  async update(id: number, updateAnnouncementDto: UpdateAnnouncementDto) {
    try {
      const announcement = await this.announcementRepository.findOneBy({id :id})
      if(!announcement) throw new HttpException(`Error to find announcement with id: ${id}`, HttpStatus.NOT_FOUND)
      await this.announcementRepository.update(id, updateAnnouncementDto)
      return {message: 'Ann'}
    } catch (error) {
      
    }
  }

  async remove(id: number) {
    return `This action removes a #${id} announcement`;
  }
}
