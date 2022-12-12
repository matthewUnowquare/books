import { Book } from "../interfaces/book";
import {faker} from "@faker-js/faker"
import * as RandExp from "randexp"
import { mockAuthorElement } from './mockAuthor';

const generateDataWithNoIsbn = ():Book=>{
  return new Book({
    title: faker.commerce.productName(),
    author: mockAuthorElement,
    description: faker.commerce.productDescription(),
    price: faker.datatype.number({min:10, max:200}),
    image: new URL(faker.image.business(200,300,false)),
    id: faker.datatype.number({min:1, max:100})
  })
}

const generateDataWithNoImage = ():Book=>{
  return new Book({
    title: faker.commerce.productName(),
    author: mockAuthorElement,
    description: faker.commerce.productDescription(),
    isbn: new RandExp(/^(97(8|9))?\d{9}(\d|X)$/).gen(),
    price: faker.datatype.number({min:10, max:200}),
    id: faker.datatype.number({min:1, max:100})
  })
}

const generateDataWithNegativePrice = ():Book=>{
  return new Book({
    title: faker.commerce.productName(),
    author: mockAuthorElement,
    description: faker.commerce.productDescription(),
    isbn: new RandExp(/^(97(8|9))?\d{9}(\d|X)$/).gen(),
    price: -1,
    image: new URL(faker.image.business(200,300,false)),
    id: faker.datatype.number({min:1, max:100})
  })
}

const generateData = ():Book=>{
  return new Book({
    title: faker.commerce.productName(),
    author: mockAuthorElement,
    description: faker.commerce.productDescription(),
    isbn: new RandExp(/^(97(8|9))?\d{9}(\d|X)$/).gen(),
    price: faker.datatype.number({min:10, max:200}),
    image: new URL(faker.image.business(200,300,false)),
    id: faker.datatype.number({min:1, max:100})
  })
}
// generate new array
export const mockBooksArray = Array.from({length: 10}, generateData)
export const mockBookElement = generateData()
export const mockBookElementWithNoIsbn = generateDataWithNoIsbn()
export const mockBookElementWithNoImage = generateDataWithNoImage()
export const mockBookElementWithNegativePrice = generateDataWithNegativePrice()
