import { Injectable } from '@nestjs/common';
import axios, { AxiosError } from 'axios';
import { AuthLoginDTO } from './dto/auth.login.dto';

@Injectable()
export class AuthService {
  async login(dto: AuthLoginDTO) {
    try {
      const result = await axios.post(
        `${process.env.KEYCLOAK_URL}/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/token`,
        {
          ...dto,
          grant_type: 'password',
          client_id: `${process.env.KEYCLOAK_CLIENT}`,
          client_secret: `${process.env.KEYCLOAK_SECRET}`,
          scope: 'openid',
        },
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        },
      );
      return { access_token: result.data.access_token };
    } catch (error) {
      const err = error as AxiosError;
      return err.message;
    }
  }
}
