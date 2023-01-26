import { PartialType } from '@nestjs/swagger';
import { CreateEventDTO } from './create-event.dto';

export class UpdateEventDto extends PartialType(CreateEventDTO) {}
