interface Book {
    saleInfo: {
        retailPrice: {
            amount: number
        }
    }
    volumeInfo: {
        authors: Array<string>
        description: string
        title: string
        imageLinks: {
            small: string
        }
    }
    id: string
}

export type { Book }
