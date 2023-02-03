import { ApiProperty } from '@nestjs/swagger';

export class UpdateEventDto {
  @ApiProperty({ nullable: false })
  name!: string;

  @ApiProperty({ nullable: false })
  body!: string;

  @ApiProperty({ nullable: false })
  to!: string;

  @ApiProperty({ nullable: false })
  phone!: string;

  @ApiProperty({ nullable: false })
  message!: string;
}
