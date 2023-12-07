import { IsNumber, Min } from 'class-validator';

export class CreateCartDto {
  @IsNumber()
  @Min(0)
  book_id: number;
  @Min(0)
  @IsNumber()
  quantity: number;
  @Min(0)
  price: number;
}

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

class CartDetails {
  id: number;
  cart_id: number;
  book_id: number;
  price: number;
  quantity: number;
  is_deleted: boolean;
  created_at: Date;
  updated_at: Date;
}
export class CartDetailsDto {
  data: CartDetails[];

  page: number;

  per_page: number;

  total: number;

  total_pages: number;
}
