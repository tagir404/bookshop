interface Book {
    volumeInfo: {
        authors: Array<string>,
        title: string,
        imageLinks: {
            thumbnail: string
        }
    },
}

export type { Book }