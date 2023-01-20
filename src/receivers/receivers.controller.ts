import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ReceiversService } from './receivers.service';
import { CreateReceiverDto } from './dto/create-receiver.dto';
import { UpdateReceiverDto } from './dto/update-receiver.dto';
import { Roles } from 'nest-keycloak-connect';
import { ApiBearerAuth } from '@nestjs/swagger';
import * as dotenv from 'dotenv' 
dotenv.config({path: './.env'})
@Controller('receivers')
@ApiBearerAuth()
export class ReceiversController {
  constructor(private readonly receiversService: ReceiversService) {}

  @Post()
  create(@Body() createReceiverDto: CreateReceiverDto) {
    return this.receiversService.create(createReceiverDto);
  }

  @Get()
  @Roles({ roles: [`realm:${process.env.KEYCLOAK_CLIENT_ID}-api-read`] })
  findAll() {
    return this.receiversService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.receiversService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateReceiverDto: UpdateReceiverDto,
  ) {
    return this.receiversService.update(+id, updateReceiverDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.receiversService.remove(+id);
  }
}
