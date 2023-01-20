import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReceiverDto } from './dto/create-receiver.dto';
import { UpdateReceiverDto } from './dto/update-receiver.dto';
import { Receiver } from './entities/receiver.entity';

@Injectable()
export class ReceiversService {
  constructor(
    @InjectRepository(InjectRepository)
    private readonly receiverRepository: Repository<Receiver>,
  ) {}

  async create(dto: CreateReceiverDto) {
    try {
      const receiver = await this.receiverRepository.create(dto);
      await this.receiverRepository.save(receiver);
      return receiver;
    } catch (error) {
      throw new HttpException(
        'Error creating a receiver',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll() {
    return `This action returns all receivers`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} receiver`;
  }

  async update(id: number, updateReceiverDto: UpdateReceiverDto) {
    return `This action updates a #${id} receiver`;
  }

  async remove(id: number) {
    return `This action removes a #${id} receiver`;
  }
}
