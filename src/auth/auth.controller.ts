import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'nest-keycloak-connect';
import { AuthService } from './auth.service';
import { AuthLoginDTO } from './dto/auth.login.dto';

@Controller('auth')
@ApiTags('Autenticação')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/login')
  async login(@Body() dto: AuthLoginDTO) {
    return this.authService.login(dto);
  }
}
