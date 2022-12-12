import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksComponent } from './books.component';

describe('BooksComponent', () => {
  let component: BooksComponent;
  let fixture: ComponentFixture<BooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BooksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should render a table', () => {
    // get the table element
    const table = fixture.nativeElement.querySelector('table');
    expect(table).toBeTruthy();
  });
});
