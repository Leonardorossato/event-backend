import { ApiProperty } from '@nestjs/swagger';

export class CreateEventEmailDto {
  @ApiProperty({ nullable: false })
  email!: string;

  @ApiProperty()
  subject!: string;

  @ApiProperty()
  body!: string;
}
