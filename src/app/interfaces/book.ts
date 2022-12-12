import * as RandExp from "randexp"
import { Author } from './author';

export class CreateBook {
    title: string;
    author?: Author;
    description: string;
    isbn: string;
    price: number;
    image: URL;
  constructor({title, author, description, isbn, price, image}: Partial<CreateBook>){
    this.title = this.setString(title);
    this.author = author;
    this.description = this.setString(description);
    this.isbn = this.setISBN(isbn);
    this.price = this.setPrice(price);
    this.image = image || new URL('https://via.placeholder.com/200x300');
  }
  // create polimorphic method
  static fromJSON(json: any): CreateBook {
    return new CreateBook({
      title: json.title,
      author: json.author,
      description: json.description,
      isbn: json.isbn,
      price: json.price,
      image: new URL(json.image)
    })
  }

  static validateISBN(isbn: string): boolean {
    // validate regex
    return new RegExp(/^(97(8|9))?\d{9}(\d|X)$/).test(isbn);
  }

  private setISBN(isbn?: string): string {
    if (!isbn || !CreateBook.validateISBN(isbn)) {
      return  new RandExp(/^(97(8|9))?\d{9}(\d|X)$/).gen();
    }
    return isbn;
  }

  private setPrice(price: number = 0): number {
    return Math.max(price, 0);
  }

  private setString(value: string = ''): string {
    return value.trim();
  }
}

export class Book extends CreateBook {
  id: number;
  authorId: number;
  constructor({id, title, authorId, description, isbn, price, image}: Partial<Book>){
    super({title, description, isbn, price, image});
    this.id = id!;
    this.authorId = authorId!;
  }
  // create polimorphic method
  static override fromJSON(json: any): Book {
    return new Book({
      id: json.id,
      title: json.title,
      author: json.author,
      description: json.description,
      isbn: json.isbn,
      price: json.price,
      image: new URL(json.image)
    })
  }
}
