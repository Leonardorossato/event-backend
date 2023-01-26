import { ApiProperty } from '@nestjs/swagger';

export class CreateAnnouncementDto {
  @ApiProperty({ nullable: false, type: String })
  creatorAnnouncements!: string;

  @ApiProperty({ nullable: false, type: String })
  releasetTitle!: string;

  @ApiProperty({ nullable: false, type: String })
  creatorsEmail!: string;

  @ApiProperty({ nullable: false, type: String })
  communiquéContent!: string;
}
