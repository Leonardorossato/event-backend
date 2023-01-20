import { Module } from '@nestjs/common';
import { ReceiversModule } from './receivers/receivers.module';
import { KeycloakModule } from './keycloak/keycloak.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ReceiversModule,
    KeycloakModule,
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
  ],
})
export class AppModule {}
