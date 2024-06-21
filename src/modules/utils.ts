import type { Book } from './types'

export const fixReqString = (str: string): string => str.replace('http://', 'https://')
export const getImgUrl = (index: number): string =>
    new URL(`../assets/img/slides/${index}.jpg`, import.meta.url).href
export const someBook: Book = {
    saleInfo: {
        retailPrice: {
            amount: 400
        }
    },
    volumeInfo: {
        authors: ['Author'],
        description: 'Description',
        title: 'Book Title',
        imageLinks: { small: '' }
    },
    id: 'test-id-1'
}
