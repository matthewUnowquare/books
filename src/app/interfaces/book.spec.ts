import { mockBookElementWithNoIsbn } from './../mocks/mockBooks';
import { Book } from './book';
import { mockBookElement, mockBookElementWithNoImage, mockBookElementWithNegativePrice } from '../mocks/mockBooks';

describe('Book', () => {
  it('should create an instance', () => {
    expect(mockBookElement).toBeDefined();
  });
  it('should test method fromJson', () => {
    const book = Book.fromJSON(mockBookElement);
    expect(book).toEqual(mockBookElement);
    expect(book instanceof Book).toBeTruthy();
});
  it('should test method validateISBN', () => {
    const book = Book.fromJSON(mockBookElement);
    expect(Book.validateISBN(book.isbn)).toBeTruthy();
  });
  it('should be false method validateISBN', () => {
    expect(Book.validateISBN('9201923215123')).toBeFalsy();
  });
  it('should create a new instance without ISBN and still generate one', () => {
    const book = Book.fromJSON(mockBookElementWithNoIsbn);
    expect(Book.validateISBN(book.isbn)).toBeTruthy();
  });
  it('should create a new instance without image and still create one', () => {
    const book = Book.fromJSON(mockBookElementWithNoImage);
    expect(book.image).toBeDefined();
  });
  it('should create a new instance always with positive price', () => {
    const book = Book.fromJSON(mockBookElementWithNegativePrice);
    expect(book.price).toBeGreaterThanOrEqual(0);
  });
  it('should create a new empty instance', () => {
    const book = new Book({});
    expect(book).toBeDefined();
    expect(book.id).toBeUndefined();
    expect(book.title).toBe('');
    expect(book.author).toBeUndefined();
    expect(book.description).toBe('');
    expect(book.isbn).toBeDefined();
    expect(book.price).toBe(0);
    expect(book.image).toBeDefined();
  });
});
