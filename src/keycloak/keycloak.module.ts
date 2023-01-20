import { Module } from '@nestjs/common';
import { KeycloakConfigService } from './keycloak.service';

@Module({
  providers: [KeycloakConfigService],
})
export class KeycloakModule {}
