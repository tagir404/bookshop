import { defineStore } from 'pinia'
import { ref, computed, reactive } from 'vue'
import type { Book } from '@/modules/types'

export const useBasketStore = defineStore('basket', () => {
    const books = ref<Book[]>([])
    const totalPrice = computed(() => Math.round(books.value.reduce((acc, book) => acc + book.saleInfo.retailPrice.amount, 0)))

    function addBookInBasket(book: Book) {
        books.value.push(book)
    }

    function removeBookFromBasket(book: Book) {
        books.value.splice(books.value.indexOf(book), 1)
    }

    return { books, totalPrice, addBookInBasket, removeBookFromBasket }
})

export const useBalanceStore = defineStore('balance', () => {
    const basketStore = useBasketStore()
    const balance = ref<number>(1000)
    const enoughBalanceToBuy = computed<boolean>(() => balance.value - basketStore.totalPrice >= 0)

    return { balance, enoughBalanceToBuy }
})

export const useDialogStore = defineStore('dialog', () => {
    const isOpen = ref<boolean>(false)
    const content = reactive({
        title: '',
        text: ''
    })
    const isNotification = ref<boolean>(false)

    const balanceStore = useBalanceStore()
    const basketStore = useBasketStore()

    function open() {
        if (balanceStore.enoughBalanceToBuy) {
            content.title = `Покупка на сумму ${basketStore.totalPrice} &#8381;`
            content.text = `Остаток на балансе после покупки ${balanceStore.balance - basketStore.totalPrice} &#8381;`
        } else {
            content.title = 'Недостаточно денег на балансе'
            content.text = ''
            showNotification()
        }
        isOpen.value = true
    }

    function close() {
        isOpen.value = false
    }

    function buy() {
        balanceStore.balance -= basketStore.totalPrice
        basketStore.books = []
        content.text = ''
        content.title = 'Спасибо за покупку'
        showNotification()
    }

    function showNotification(): void {
        isNotification.value = true

        setTimeout(() => {
            close()
            isNotification.value = false
        }, 2000)
    }

    return { isOpen, isNotification, content, open, close, buy }
})