import { Module } from '@nestjs/common';
import { ReceiversModule } from './receivers/receivers.module';
import { KeycloakModule } from './keycloak/keycloak.module';

@Module({
  imports: [ReceiversModule, KeycloakModule],
})
export class AppModule {}
