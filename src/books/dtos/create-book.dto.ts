import {
    IsNotEmpty,
    IsString,
    Length,
    IsInt,
    Min,
    IsUUID
} from 'class-validator';
  
export class CreateBookDTO {
    @IsNotEmpty()
    @IsString()
    @Length(10, 20)
    title: string;
  
    @IsNotEmpty()
    @IsInt()
    @Min(0)
    rating: number;

    @IsNotEmpty()
    @IsInt()
    @Min(0)
    price: number;

    @IsNotEmpty()
    @IsUUID()
    @IsString()
    authorId: string;
}