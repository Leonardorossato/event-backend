import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Repository, UpdateValuesMissingError } from 'typeorm';
import { CreateReceiverDto } from './dto/create-receiver.dto';
import { UpdateReceiverDto } from './dto/update-receiver.dto';
import { Receiver } from './entities/receiver.entity';

@Injectable()
export class ReceiversService {
  constructor(
    @InjectRepository(Receiver)
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
    try {
      const receiver = await this.receiverRepository.find();
      return receiver;
    } catch (error) {
      throw new HttpException(
        'Error finding all receiver',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number) {
    return `This action returns a #${id} receiver`;
  }

  async update(id: number, dto: UpdateReceiverDto) {
    try {
      const receiver = await this.receiverRepository.findOneBy({ id: id });
      if (!receiver?.id)
        throw new HttpException(
          `Error finding receiver with id: ${id}`,
          HttpStatus.NOT_FOUND,
        );
      await this.receiverRepository.update(id, {...dto});
      return { message: 'Successfully updated a receiver' };
    } catch (error) {
      throw new HttpException(
        'Error updating a receiver',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async remove(id: number) {
    try {
      const receiver = await this.receiverRepository.findOneBy({ id: id });
      if (!receiver)
        throw new HttpException(
          `Error finding receiver wtih id: ${id}`,
          HttpStatus.NOT_FOUND,
        );
      await this.receiverRepository.delete(id);
      return { message: 'Successfully removed a receiver' };
    } catch (error) {
      throw new HttpException(
        `Error removing a receiver with id: ${id}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
