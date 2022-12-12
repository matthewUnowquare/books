import { faker } from '@faker-js/faker';
import { Author } from '../interfaces/author';

const generateData=():Author=>{
  return new Author({
    name: faker.name.fullName(),
    id: faker.datatype.number({min:1, max:100}),
    image: new URL(faker.image.business(200,300,false)),
    // born is more than 18 years ago
    born: faker.date.birthdate({min:18, max:100, mode: 'age'}),
    died: faker.date.past(10)
  })
}

const generateAuthorAlive = ():Author=>{
  return new Author({
    name: faker.name.fullName(),
    id: faker.datatype.number({min:1, max:100}),
    image: new URL(faker.image.business(200,300,false)),
    born: faker.date.birthdate({min:18, max:100, mode: 'age'}),
    died: undefined
  })
}
const generateAuthorDead = ():Author=>{
  return new Author({
    name: faker.name.fullName(),
    id: faker.datatype.number({min:1, max:100}),
    image: new URL(faker.image.business(200,300,false)),
    born: faker.date.birthdate({min:1940, max:1970, mode: 'year'}),
    died: faker.date.past(10)
  })
}

export const mockAuthorsArray = Array.from({length: 10}, generateData)
export const mockAuthorElement = generateData();
export const mockAuthorElementAlive = generateAuthorAlive();
export const mockAuthorElementDead = generateAuthorDead();
