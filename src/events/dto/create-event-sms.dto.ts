import { ApiProperty } from '@nestjs/swagger';

export class CreateEventSMSDTO {
  @ApiProperty({ nullable: false })
  receiverId!: number;

  @ApiProperty({ nullable: false })
  announcementId!: number;

  @ApiProperty({ nullable: false })
  name!: string;

  @ApiProperty({ nullable: false })
  body!: string;

  @ApiProperty({ nullable: false })
  to!: string;
}
