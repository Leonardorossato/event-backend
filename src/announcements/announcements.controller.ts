import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiPropertyOptional,
  ApiTags,
} from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { Roles } from 'nest-keycloak-connect';
import { AnnouncementsService } from './announcements.service';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';
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

  @Put(':id')
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
