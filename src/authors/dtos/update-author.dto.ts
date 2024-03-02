import {
    IsNotEmpty,
    IsString,
    Length,
  } from 'class-validator';
  
export class UpdateAuthorDTO {
    @IsNotEmpty()
    @IsString()
    @Length(10, 20)
    name: string;
  
    @IsNotEmpty()
    @IsString()
    @Length(5, 20)
    country: string;
}