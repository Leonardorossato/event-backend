import { PartialType } from '@nestjs/mapped-types';
import { CreateReceiverDto } from './create-receiver.dto';

export class UpdateReceiverDto extends PartialType(CreateReceiverDto) {}
