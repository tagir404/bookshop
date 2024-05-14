import { describe, it, expect, vi } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'

import BookItem from '@/components/BookItem.vue'
import bookCoverPhoto from '@/assets/img/book-cover.png'
import { fixReqString } from '@/modules/utils'
import { useBasketStore } from '@/store/store'
import { createPinia, setActivePinia } from 'pinia'

describe('BookItem', () => {
    setActivePinia(createPinia())

    const wrapper = shallowMount(BookItem, {
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
        // global: {
        //     plugins: [
        //         createTestingPinia({
        //             createSpy: vi.fn(),
        //             stubActions: true
        //         })
        //     ]
        // }
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

    it('adding a book to store', () => {
        const basketStore = useBasketStore()
        const bookActionBtn = wrapper.get('[data-test="book-action-btn"]')
        bookActionBtn.trigger('click')
        expect(!!basketStore.books.find(book => book.id === wrapper.props('book').id)).toBeTruthy()
    })
})
