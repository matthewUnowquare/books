export class Author {
  id?: number;
  name: string;
  image: URL;
  born: Date;
  died?: Date;
  constructor({id, name, image, born: born, died: died}: Partial<Author>){
    this.id = id;
    this.name = name || '';
    this.image = image || new URL('https://via.placeholder.com/200x300');
    this.born = this.inputBorn(born);
    this.died = died;
  }
  static fromJSON(json: any): Author {
    return new Author({
      id: json.id,
      name: json.name,
      image: json.image,
      born: json.born,
      died: json.died
    })
  }

  private inputBorn(born?: Date): Date {
    if(born){
      return born;
    }
    // return new date - 18 years
    return new Date(new Date().setFullYear(new Date().getFullYear() - 18));
  }

  get age(): number {
    // get age
    if(this.died){
      return this.died.getFullYear() - this.born.getFullYear();
    }
    return new Date().getFullYear() - this.born.getFullYear();
  }

  get isAlive(): boolean {
    return !this.died;
  }

  get diedOrAlive(): string {
    return this.isAlive ? 'Alive' : 'Dead';
  }


}
