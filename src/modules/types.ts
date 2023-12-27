interface Book {
    volumeInfo: {
        authors: Array<string>,
        title: string,
        imageLinks: {
            small: string
        }
    },
    id: string
}

export type { Book }