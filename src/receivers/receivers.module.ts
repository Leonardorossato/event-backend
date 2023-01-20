import { Module } from '@nestjs/common';
import { ReceiversService } from './receivers.service';
import { ReceiversController } from './receivers.controller';

@Module({
  controllers: [ReceiversController],
  providers: [ReceiversService]
})
export class ReceiversModule {}
