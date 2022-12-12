import { Author } from './author';
import { mockAuthorElement, mockAuthorElementDead, mockAuthorElementAlive } from '../mocks/mockAuthor';

describe('Author', () => {
  it('should create an instance', () => {
    expect(mockAuthorElement).toBeTruthy();
  });
  it('should test method fromJson', () => {
    const author = Author.fromJSON(mockAuthorElement);
    expect(author).toEqual(mockAuthorElement);
  })
  it('should test dead author', () => {
    const author = Author.fromJSON(mockAuthorElementDead);
    expect(author.isAlive).toBeFalse();
    expect(author.died).toBeDefined();
  });
  it('should test alive author', () => {
    const author = Author.fromJSON(mockAuthorElementAlive);
    expect(author.isAlive).toBeTrue();
    expect(author.died).toBeUndefined();
  });
  it('should display the age', () => {
    const author = Author.fromJSON(mockAuthorElementAlive);
    expect(author.age).toBeGreaterThanOrEqual(18);
    expect(author.age).toBeDefined();
  });
});
