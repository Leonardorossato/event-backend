import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ReceiversService } from './receivers.service';
import { CreateReceiverDto } from './dto/create-receiver.dto';
import { UpdateReceiverDto } from './dto/update-receiver.dto';
import { Roles } from 'nest-keycloak-connect';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
dotenv.config({ path: './.env' });
@Controller('receivers')
@ApiTags('Recebedores')
@ApiBearerAuth()
export class ReceiversController {
  constructor(private readonly receiversService: ReceiversService) {}

  @Post()
  @Roles({ roles: [`realm:${process.env.KEYCLOAK_CLIENT_ID}-api-create`] })
  async create(@Body() createReceiverDto: CreateReceiverDto) {
    return await this.receiversService.create(createReceiverDto);
  }

  @Get()
  @Roles({ roles: [`realm:${process.env.KEYCLOAK_CLIENT_ID}-api-read`] })
  async findAll() {
    return await this.receiversService.findAll();
  }

  @Get(':id')
  @Roles({ roles: [`realm:${process.env.KEYCLOAK_CLIENT_ID}-api-read`] })
  async findOne(@Param('id') id: number) {
    return await this.receiversService.findOne(id);
  }

  @Put(':id')
  @Roles({ roles: [`realm:${process.env.KEYCLOAK_CLIENT_ID}-api-update`] })
  async update(@Param('id') id: number, @Body() dto: UpdateReceiverDto) {
    return await this.receiversService.update(id, dto);
  }

  @Delete(':id')
  @Roles({ roles: [`realm:${process.env.KEYCLOAK_CLIENT_ID}-api-delete`] })
  async remove(@Param('id') id: number) {
    return await this.receiversService.remove(id);
  }
}
