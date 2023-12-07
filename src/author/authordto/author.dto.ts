import { IsDate, IsNotEmpty } from 'class-validator';

export class AuthorDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  nationality: string;
  @IsDate()
  birth_date: Date;
}
export class UpdateAuthorDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  nationality: string;
}
