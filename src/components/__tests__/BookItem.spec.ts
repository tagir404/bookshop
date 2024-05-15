import { describe, it, expect, beforeEach } from 'vitest'
import { VueWrapper, mount } from '@vue/test-utils'

import BookItem from '@/components/BookItem.vue'
import bookCoverPhoto from '@/assets/img/book-cover.png'
import { fixReqString } from '@/modules/utils'
import { useBasketStore } from '@/store/store'
import { createPinia, setActivePinia } from 'pinia'

describe('BookItem', () => {
    let wrapper: VueWrapper<any>;
    let basketStore: ReturnType<typeof useBasketStore>;
    
    beforeEach(() => {
        setActivePinia(createPinia())
        basketStore = useBasketStore()

        wrapper = mount(BookItem, {
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
                    id: 'test-id-1'
                },
                type: ''
            },
        })
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

    it('adding a book to the basket', () => {
        const bookActionBtn = wrapper.get('[data-test="book-action-btn"]')
        bookActionBtn.trigger('click')
    
        expect(!!basketStore.books.find(book => book.id === wrapper.props('book').id)).toBeTruthy()
    })

    it('removing a book from the basket', async () => {
        basketStore.addBookInBasket(wrapper.props('book'))

        await wrapper.setProps({ type: 'basket' })

        const bookActionBtn = wrapper.get('[data-test="book-action-btn"]')
        bookActionBtn.trigger('click')

        expect(!!basketStore.books.find(book => book.id === wrapper.props('book').id)).toBeFalsy()
    })
})
