import {
    IsNotEmpty,
    IsString,
    IsUUID,
} from 'class-validator';
  
export class LikedBookDTO {
    @IsNotEmpty()
    @IsString()
    @IsUUID()
    bookId: string;

    @IsNotEmpty()
    @IsUUID()
    @IsString()
    userId: string;
}