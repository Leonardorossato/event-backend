import { ApiProperty } from '@nestjs/swagger';

export class CreateReceiverDto {
  @ApiProperty({ nullable: false, type: String, minLength: 3, maxLength: 255 })
  fullName!: string;

  @ApiProperty({ nullable: false, type: String, minLength: 3, maxLength: 255 })
  email!: string;

  @ApiProperty({ nullable: false, type: String, minLength: 3, maxLength: 255 })
  whatsapp!: string;

  @ApiProperty({ nullable: false, type: String })
  cellphone!: string;

  @ApiProperty({ nullable: false, type: String, minLength: 3, maxLength: 255 })
  message!: string;
}
