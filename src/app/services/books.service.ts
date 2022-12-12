import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  map,
  Observable,
  Subject,
  switchMap,
  tap,
} from 'rxjs';
import { environment } from 'src/environments/environment';
import { Book, CreateBook } from '../interfaces/book';
import { PricesFilter } from '../interfaces/prices-filter';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private books$?: Observable<Book[]>;
  private authorFilter$?: BehaviorSubject<string | null>;
  private titleFilter$?: BehaviorSubject<string | null>;
  private priceFilter$?: BehaviorSubject<PricesFilter | null>;

  constructor(private http: HttpClient) {
    this.authorFilter$ = new BehaviorSubject<string | null>(null);
    this.titleFilter$ = new BehaviorSubject<string | null>(null);
    this.priceFilter$ = new BehaviorSubject<PricesFilter | null>(null);
    this.books$ = combineLatest([
      this.authorFilter$,
      this.titleFilter$,
      this.priceFilter$,
    ]).pipe(
      switchMap(([author, title, price]) => {
        let params = new HttpParams();
        params = params.set('_expand', 'author');
        if (author) {
          params = params.set('author', author.toString());
        }
        if (title) {
          params = params.set('title_like', title);
        }
        if (price) {
          params = params.set('price_gte', price.min.toString());
          if (price.max) {
            params = params.set('price_lte', price.max.toString());
          }
        }
        return this.http.get<Book[]>(`${environment.url}/books`, { params });
      })
    );
  }
  getBooks(): Observable<Book[]> {
    return this.books$!;
  }

  getOneBook(id: number): Observable<Book> {
    return this.http.get<Book>(`${environment.url}/books/${id}`);
  }

  updateBook(book: Book): Observable<Book> {
    return this.http
      .put<Book>(`${environment.url}/books/${book.id}`, book)
      .pipe(
        tap((book) => {
          this.books$?.pipe(
            map((books) => {
              const index = books.findIndex((b) => b.id === book.id);
              books[index] = book;
            })
          );
        })
      );
  }
  createBook(book: CreateBook): Observable<Book> {
    return this.http.post<Book>(`${environment.url}/books`, book).pipe(
      tap((book) => {
        this.books$?.pipe(
          tap((books) => {
            books.push(book);
          })
        );
      })
    );
  }
  filterPrice(price: PricesFilter) {
    this.priceFilter$?.next(price);
  }
  filterTitle(title: string) {
    this.titleFilter$?.next(title);
  }
}
