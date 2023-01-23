import { Module } from '@nestjs/common';
import { KeycloakConfigService } from './keycloak.service';

@Module({
  providers: [KeycloakConfigService],
  exports: [KeycloakConfigService],
})
export class KeycloakModule {}
