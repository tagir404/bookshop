import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useBasketStore } from '@/store/store'
import { someBook } from '@/modules/utils'

describe('Basket Store', () => {
    let basketStore: ReturnType<typeof useBasketStore>

    beforeEach(() => {
        setActivePinia(createPinia())
        basketStore = useBasketStore()
    })

  
    it('adds book', () => {
        expect(basketStore.books.length).toBe(0)
        basketStore.addBookInBasket(someBook)
        expect(basketStore.books.length).toBe(1)
    })

    it('removes book', () => {
        basketStore.addBookInBasket(someBook)
        expect(basketStore.books.length).toBe(1)
        basketStore.removeBookFromBasket(someBook)
        expect(basketStore.books.length).toBe(0)
    })

    it('proper total price', () => {
        basketStore.addBookInBasket(someBook)
        basketStore.addBookInBasket(someBook)

        const totalPrice = Math.round(basketStore.books.reduce((acc, book) => acc + book.saleInfo.retailPrice.amount, 0))

        expect(basketStore.totalPrice).toBe(totalPrice)
    })
  })