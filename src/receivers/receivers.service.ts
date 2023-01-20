import { Injectable } from '@nestjs/common';
import { CreateReceiverDto } from './dto/create-receiver.dto';
import { UpdateReceiverDto } from './dto/update-receiver.dto';

@Injectable()
export class ReceiversService {
  create(createReceiverDto: CreateReceiverDto) {
    return 'This action adds a new receiver';
  }

  findAll() {
    return `This action returns all receivers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} receiver`;
  }

  update(id: number, updateReceiverDto: UpdateReceiverDto) {
    return `This action updates a #${id} receiver`;
  }

  remove(id: number) {
    return `This action removes a #${id} receiver`;
  }
}
