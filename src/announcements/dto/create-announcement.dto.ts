import { ApiProperty } from '@nestjs/swagger';

export class CreateAnnouncementDto {
  @ApiProperty({ nullable: false })
  receiverId!: number;

  @ApiProperty({
    nullable: false,
    type: String,
    minLength: 3,
    maxLength: 255,
  })
  creatorAnnouncement!: string;

  @ApiProperty({
    nullable: false,
    type: String,
    minLength: 3,
    maxLength: 255,
  })
  creatorEmail!: string;

  @ApiProperty({
    nullable: false,
    type: String,
    minLength: 3,
    maxLength: 255,
  })
  communiqContent!: string;
}
