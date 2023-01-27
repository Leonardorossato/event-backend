import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateEventEmailDTO {
  @ApiProperty({ nullable: false })
  receiverId!: number;

  @ApiProperty({ nullable: false })
  announcementId!: number;

  @ApiProperty({ nullable: false })
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @ApiProperty()
  subject!: string;

  @ApiProperty()
  html!: string;
}
