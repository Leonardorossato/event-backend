import { Module } from '@nestjs/common';
import { ReceiversService } from './receivers.service';
import { ReceiversController } from './receivers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Receiver } from './entities/receiver.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Receiver])],
  controllers: [ReceiversController],
  providers: [ReceiversService],
})
export class ReceiversModule {}
