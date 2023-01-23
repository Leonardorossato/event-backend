import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Roles } from 'nest-keycloak-connect';
import { AnnouncementsService } from './announcements.service';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';
import * as dotenv from 'dotenv';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
dotenv.config({ path: './.env' });
@ApiTags('Comunicados')
@Controller('announcements')
@ApiBearerAuth()
export class AnnouncementsController {
  constructor(private readonly announcementsService: AnnouncementsService) {}

  @Post()
  @Roles({ roles: [`realm:${process.env.KEYCLOAK_CLIENT_ID}-api-create`] })
  async create(@Body() createAnnouncementDto: CreateAnnouncementDto) {
    return await this.announcementsService.create(createAnnouncementDto);
  }

  @Post('/event-email')
  @Roles({ roles: [`realm:${process.env.KEYCLOAK_CLIENT_ID}-api-create`] })
  async createEventWhastApp(@Body() dto: CreateAnnouncementDto) {
    return await this.announcementsService.createEventByWhastApp(dto);
  }

  @Post('/event-whastApp')
  @Roles({ roles: [`realm:${process.env.KEYCLOAK_CLIENT_ID}-api-create`] })
  async createEventByEmail(@Body() dto: CreateAnnouncementDto) {
    return await this.announcementsService.createEventByEmail(dto);
  }

  @Get()
  @Roles({ roles: [`realm:${process.env.KEYCLOAK_CLIENT_ID}-api-read`] })
  async findAll() {
    return await this.announcementsService.findAll();
  }

  @Get(':id')
  @Roles({ roles: [`realm:${process.env.KEYCLOAK_CLIENT_ID}-api-read`] })
  async findOne(@Param('id') id: number) {
    return await this.announcementsService.findOne(id);
  }

  @Patch(':id')
  @Roles({ roles: [`realm:${process.env.KEYCLOAK_CLIENT_ID}-api-update`] })
  async update(
    @Param('id') id: number,
    @Body() updateAnnouncementDto: UpdateAnnouncementDto,
  ) {
    return await this.announcementsService.update(id, updateAnnouncementDto);
  }

  @Delete(':id')
  @Roles({ roles: [`realm:${process.env.KEYCLOAK_CLIENT_ID}-api-delete`] })
  async remove(@Param('id') id: number) {
    return await this.announcementsService.remove(id);
  }
}
