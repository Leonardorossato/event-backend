import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReceiversService } from './receivers.service';
import { CreateReceiverDto } from './dto/create-receiver.dto';
import { UpdateReceiverDto } from './dto/update-receiver.dto';

@Controller('receivers')
export class ReceiversController {
  constructor(private readonly receiversService: ReceiversService) {}

  @Post()
  create(@Body() createReceiverDto: CreateReceiverDto) {
    return this.receiversService.create(createReceiverDto);
  }

  @Get()
  findAll() {
    return this.receiversService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.receiversService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReceiverDto: UpdateReceiverDto) {
    return this.receiversService.update(+id, updateReceiverDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.receiversService.remove(+id);
  }
}
