import { Module } from '@nestjs/common';
import { ReceiversModule } from './receivers/receivers.module';

@Module({
  imports: [ReceiversModule],
})
export class AppModule {}
