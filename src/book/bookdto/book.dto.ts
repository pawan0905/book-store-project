import { IsDate, IsNotEmpty, Min } from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  author_id: number;
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  genre: string;
  @IsDate()
  publication_date: Date;
  @IsNotEmpty()
  @Min(0)
  price: number;
  @IsNotEmpty()
  @Min(0)
  quantity: number;
  @IsNotEmpty()
  category: string;
}
export class UpdateBookDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  genre: string;
  @IsDate()
  publication_date: Date;
  @IsNotEmpty()
  @Min(0)
  price: number;
  @IsNotEmpty()
  category: string;
}
/*export class FilterBookDTO {
  search: string;
  category: string;
}*/
class BookDto {
  title: string;

  genre: string;

  publication_date: Date;

  price: number;

  quantity: number;

  category: string;

  is_deleted: boolean;

  created_at: Date;

  updated_at: Date;
}
