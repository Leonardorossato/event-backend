import { ApiProperty } from '@nestjs/swagger';

export class AuthLoginDTO {
  @ApiProperty({ nullable: false })
  username!: string;

  @ApiProperty({ nullable: false })
  password!: string;
}
