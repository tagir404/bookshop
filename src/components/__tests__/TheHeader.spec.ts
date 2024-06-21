import { describe, it, expect, beforeEach } from 'vitest'
import { VueWrapper, mount } from '@vue/test-utils'
import { useBasketStore, useBalanceStore } from '@/store/store'
import { createPinia, setActivePinia } from 'pinia'
import TheHeader from '@/components/TheHeader.vue'
import type { Book } from '@/modules/types'

const someBook: Book = {
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

describe('TheHeader', () => {

    let wrapper: VueWrapper<any>
    let basketStore: ReturnType<typeof useBasketStore>
    let balanceStore: ReturnType<typeof useBalanceStore>
    beforeEach(() => {
        setActivePinia(createPinia())
        basketStore = useBasketStore()
        balanceStore = useBalanceStore()
        wrapper = mount(TheHeader)
    })


    it('balance renders properly', () => {
        expect(wrapper.find('[data-test="header-balance"]').text()).toBe(`Баланс: ${balanceStore.balance} ₽`)
    })

    it('balance changes properly', async () => {
        balanceStore.balance = balanceStore.balance - 100

        await wrapper.vm.$nextTick()

        expect(wrapper.find('[data-test="header-balance"]').text()).toBe(`Баланс: ${balanceStore.balance} ₽`)
    })

    it('basket info not exists by default', () => {
        expect(wrapper.find('[data-test="header-basket-info"]').exists()).toBeFalsy()
    })

    it('basket information exists when book is added', async () => {
        basketStore.addBookInBasket(someBook)

        await wrapper.vm.$nextTick()

        expect(wrapper.find('[data-test="header-basket-info"]').exists()).toBeTruthy()
    })

    it('basket information shows correct info when book is added', async () => {
        basketStore.addBookInBasket(someBook)

        await wrapper.vm.$nextTick()

        expect(wrapper.find('[data-test="header-basket-info"]').text()).toBe('1')

        basketStore.addBookInBasket(someBook)

        await wrapper.vm.$nextTick()

        expect(wrapper.find('[data-test="header-basket-info"]').text()).toBe('2')
    })
})