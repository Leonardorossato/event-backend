export class CreateEventSMSDTO{
    @ApiProperty({ nullable: false })
    receiverId!: number;
  
    @ApiProperty({ nullable: false })
    announcementId!: number;
  
    @ApiProperty({ nullable: false })
    phone!: string;
  
    @ApiProperty({ nullable: false })
    message!: string;
}