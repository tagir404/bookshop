import { describe, it, expect, beforeEach } from 'vitest'
import { VueWrapper, mount } from '@vue/test-utils'
import BookItem from '@/components/BookItem.vue'
import bookCoverPhoto from '@/assets/img/book-cover.png'
import { fixReqString } from '@/modules/utils'
import { useBasketStore } from '@/store/store'
import { createPinia, setActivePinia } from 'pinia'

describe('BookItem', () => {
    let wrapper: VueWrapper<any>
    let basketStore: ReturnType<typeof useBasketStore>
    
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

    it('adds a book to the basket by clicking on the button', () => {
        const bookActionBtn = wrapper.get('[data-test="book-action-btn"]')
        bookActionBtn.trigger('click')
    
        expect(!!basketStore.books.find(book => book.id === wrapper.props('book').id)).toBeTruthy()
    })

    it('removes a book from the basket by clicking on the button', async () => {
        basketStore.addBookInBasket(wrapper.props('book'))

        await wrapper.setProps({ type: 'basket' })

        const bookActionBtn = wrapper.get('[data-test="book-action-btn"]')
        bookActionBtn.trigger('click')

        expect(!!basketStore.books.find(book => book.id === wrapper.props('book').id)).toBeFalsy()
    })

    it('disables add button if book is already in the basket', async () => {
        basketStore.addBookInBasket(wrapper.props('book'))

        await wrapper.vm.$nextTick()

        const bookActionBtn = wrapper.get('[data-test="book-action-btn"]')
        expect(bookActionBtn.attributes('disabled')).toBe('')
        expect(bookActionBtn.text()).toBe('В корзине')
    })

    it('shows default book cover if image is missing', async () => {
        await wrapper.setProps({
            book: {
                ...wrapper.props('book'),
                volumeInfo: {
                    ...wrapper.props('book').volumeInfo,
                    imageLinks: {}
                }
            }
        })

        const bookImg = wrapper.get('[data-test="book-img"]')
        expect(bookImg.attributes('src')).toBe(bookCoverPhoto)
    })

    it('does not render description if it is missing', async () => {
        await wrapper.setProps({
            book: {
                ...wrapper.props('book'),
                volumeInfo: {
                    ...wrapper.props('book').volumeInfo,
                    description: ''
                }
            }
        })

        const bookDescription = wrapper.find('[data-test="book-description"]')
        expect(bookDescription.exists()).toBeFalsy()
    })

    it('renders remove button when type is basket', async () => {
        await wrapper.setProps({ type: 'basket' })

        const bookActionBtn = wrapper.get('[data-test="book-action-btn"]')
        expect(bookActionBtn.text()).toBe('Удалить из корзины')
    })

    it('renders add button when type is not basket', () => {
        const bookActionBtn = wrapper.get('[data-test="book-action-btn"]')
        expect(bookActionBtn.text()).toBe('Добавить в корзину')
    })
})
