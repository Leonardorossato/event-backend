import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import dotenv from 'dotenv';
import { Roles } from 'nest-keycloak-connect';
import { CreateEventEmailDTO } from './dto/create-event-email.dto';
import { CreateEventSMSDTO } from './dto/create-event-sms.dto';
import { CreateEventWhatsAppDTO } from './dto/create-event-whatsapp.dto';
import { CreateEventDTO } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventsService } from './events.service';
dotenv.config({ path: './.env' });

@ApiTags('Eventos')
@ApiBearerAuth()
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @Roles({ roles: [`realm:${process.env.KEYCLOAK_CLIENT_ID}-api-create`] })
  async create(@Body() dto: CreateEventDTO) {
    return await this.eventsService.create(dto);
  }

  @Post('event-email')
  @Roles({ roles: [`realm:${process.env.KEYCLOAK_CLIENT_ID}-api-create`] })
  async createEventEmail(@Body() dto: CreateEventEmailDTO) {
    return await this.eventsService.createEventEmail(dto);
  }

  @Post('event-whatsApp')
  @Roles({ roles: [`realm:${process.env.KEYCLOAK_CLIENT_ID}-api-create`] })
  async createEventByWhatsApp(@Body() dto: CreateEventWhatsAppDTO) {
    return await this.eventsService.create(dto);
  }

  @Post('event-sms')
  @Roles({ roles: [`realm:${process.env.KEYCLOAK_CLIENT_ID}-api-create`] })
  async createEventBySMS(@Body() dto: CreateEventSMSDTO) {
    return await this.eventsService.createEventSMS(dto);
  }

  @Get()
  @Roles({ roles: [`realm:${process.env.KEYCLOAK_CLIENT_ID}-api-read`] })
  async findAll() {
    return await this.eventsService.findAll();
  }

  @Get(':id')
  @Roles({ roles: [`realm:${process.env.KEYCLOAK_CLIENT_ID}-api-read`] })
  async findOne(@Param('id') id: number) {
    return await this.eventsService.findOne(id);
  }

  @Put(':id')
  @Roles({ roles: [`realm:${process.env.KEYCLOAK_CLIENT_ID}-api-update`] })
  async update(
    @Param('id') id: number,
    @Body() updateEventDto: UpdateEventDto,
  ) {
    return this.eventsService.update(id, updateEventDto);
  }

  @Delete(':id')
  @Roles({ roles: [`realm:${process.env.KEYCLOAK_CLIENT_ID}-api-delete`] })
  async remove(@Param('id') id: number) {
    return this.eventsService.remove(id);
  }
}
