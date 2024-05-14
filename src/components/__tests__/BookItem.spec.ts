import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import BookItem from '@/components/BookItem.vue'
import bookCoverPhoto from '@/assets/img/book-cover.png'
import { fixReqString } from '@/modules/utils'
import { useBasketStore } from '@/store/store'
import { createPinia, setActivePinia } from 'pinia'

describe('BookItem', () => {
    setActivePinia(createPinia())

    const wrapper = mount(BookItem, {
        props: {
            book: {
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
                id: ''
            },
            type: ''
        },
    })

    it('renders properly', () => {
        const bookAuthors = wrapper.get('[data-test="book-authors"]')
        const bookTitle = wrapper.get('[data-test="book-title"]')
        const bookDescription = wrapper.get('[data-test="book-description"]')
        const bookPrice = wrapper.get('[data-test="book-price"]')
        const bookImg = wrapper.get('[data-test="book-img"]')

        expect(bookAuthors.text()).toContain(wrapper.props('book').volumeInfo.authors)
        expect(bookTitle.text()).toBe(wrapper.props('book').volumeInfo.title)
        expect(bookDescription.text()).toBe(wrapper.props('book').volumeInfo.description)
        expect(bookPrice.text()).toContain(`${wrapper.props('book').saleInfo.retailPrice.amount} ₽`)
        expect(bookImg.attributes('src')).toBe(
            fixReqString(wrapper.props('book').volumeInfo.imageLinks.small || '') || bookCoverPhoto
        )
    })

    it('adding the book to store', () => {
        const basketStore = useBasketStore()
        const bookActionBtn = wrapper.get('[data-test="book-action-btn"]')
        bookActionBtn.trigger('click')
        expect(!!basketStore.books.find(book => book.id === wrapper.props('book').id)).toBeTruthy()
    })

    // it('remove the book from store', () => {
    //     const basketStore = useBasketStore()
    //     const bookActionBtn = wrapper.get('[data-test="book-action-btn"]')
    //     bookActionBtn.trigger('click')
    //     expect(!!basketStore.books.find(book => book.id === wrapper.props('book').id)).toBeFalsy()
    // })
})
