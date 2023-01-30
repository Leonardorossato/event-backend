import { ApiProperty } from '@nestjs/swagger';

export class CreateEventWhatsAppDTO {
  @ApiProperty({ nullable: false })
  receiverId!: number;

  @ApiProperty({ nullable: false })
  announcementId!: number;

  @ApiProperty({ nullable: false })
  name!: string;

  @ApiProperty({ nullable: false })
  phone!: string;

  @ApiProperty({ nullable: false })
  message!: string;
}
