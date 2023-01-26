import { ApiProperty } from '@nestjs/swagger';

export class CreateEventDto {
  @ApiProperty({ type: Number })
  receiverId!: number;

  @ApiProperty({ type: Number })
  announcementId!: number;

  @ApiProperty({ type: [String], nullable: false })
  email!: string[];
}
