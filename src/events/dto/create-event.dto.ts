import { ApiProperty } from '@nestjs/swagger';

export class CreateEventDTO {
  @ApiProperty({ nullable: false })
  name!: string;

  @ApiProperty({ nullable: false })
  receiverId?: number;

  @ApiProperty({ nullable: false })
  announcementId?: number;
}
