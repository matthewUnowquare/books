import { environment } from './../../environments/environment';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { BooksService } from './books.service';
import { mockBooksArray, mockBookElement } from '../mocks/mockBooks';

describe('BooksService', () => {
  let service: BooksService;
  let httpController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(BooksService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should call getAllBooks and return an array of Books', () => {
    service.getBooks().subscribe((res)=>{
      expect(res).toEqual(mockBooksArray)
    })
    const req = httpController.expectOne({
      method: 'GET',
      url: `${environment.url}/books?_expand=author`
    })

    req.flush(mockBooksArray)
  });
  it('should call getBooks and return an array of books filtered by title', () => {
    service.filterTitle('title');
    service.getBooks().subscribe((res)=>{
      expect(res.every((book)=> book.title.toLowerCase().includes('title'))).toBeTruthy();
    })
    const req = httpController.expectOne({
      method: 'GET',
      url: `${environment.url}/books?_expand=author&title_like=title`
    })
    expect(req.request.params.get('title_like')).toEqual('title');
    req.flush(mockBooksArray.filter(
      (book)=> book.title.toLowerCase().includes('title')
    ), {status: 200, statusText: 'OK'});
  });
  it('should call getBooks and return an array of books filtered by price', () => {
    service.filterPrice({min: 10, max: 20});
    service.getBooks().subscribe((res)=>{
      expect(res.every((book)=> book.price >= 10 && book.price <= 20)).toBeTruthy();
    })
    const req = httpController.expectOne({
      method: 'GET',
      url: `${environment.url}/books?_expand=author&price_gte=10&price_lte=20`
    })
    expect(req.request.params.get('price_gte')).toEqual('10');
    expect(req.request.params.get('price_lte')).toEqual('20');
    req.flush(mockBooksArray.filter(
      (book)=> book.price >= 10 && book.price <= 20
    ), {status: 200, statusText: 'OK'});
  });
  it('should call getOneBook and return a Book', () => {
    service.getOneBook(mockBookElement.id!).subscribe((res)=>{
      expect(res).toEqual(mockBookElement)
    })

    const req = httpController.expectOne({
      method: 'GET',
      url: `${environment.url}/books/${mockBookElement.id!}`
    })
    req.flush(mockBookElement);
  });
  it('should call create Book and return the new book', () => {

    service.createBook(mockBookElement).subscribe((res)=>{
      expect(res).toEqual(mockBookElement)
    })
    const post = httpController.expectOne({
      method: 'POST',
      url: `${environment.url}/books`,
    })
    post.flush(mockBookElement);
  });
  it('should call updateBook and return a new Book', () => {
    service.updateBook(mockBookElement).subscribe((res)=>{
      expect(res).toEqual(mockBookElement)
    })
    const req = httpController.expectOne({
      method: 'PUT',
      url: `${environment.url}/books/${mockBookElement.id!}`
    })
    req.flush(mockBookElement);
  });
});
