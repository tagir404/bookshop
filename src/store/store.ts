import { defineStore } from 'pinia'
import { ref, computed, reactive } from 'vue'
import type { Book } from '@/modules/types'

export const useBasketStore = defineStore('basket', () => {
    const books = ref<Book[]>(JSON.parse(localStorage.getItem('basket') || '[]'))
    const totalPrice = computed(() => Math.round(books.value.reduce((acc, book) => acc + book.saleInfo.retailPrice.amount, 0)))

    function addBookInBasket(book: Book) {
        books.value.push(book)
        localStorage.setItem('basket', JSON.stringify(books.value))
    }

    return { books, totalPrice, addBookInBasket }
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
    
    const balanceStore = useBalanceStore()
    const basketStore = useBasketStore()

    function open() {
        if(balanceStore.enoughBalanceToBuy) {
            content.title = `Покупка на сумму ${basketStore.totalPrice} &#8381;`
            content.text = `Остаток на балансе после покупки ${balanceStore.balance - basketStore.totalPrice} &#8381;`
        } else {
            content.title = 'Недостаточно денег на балансе'
            content.text = ''
            setTimeout(() => {
                isOpen.value = false
            }, 2000)
        }
        isOpen.value = true
    }

    function close() {
        isOpen.value = false
    }

    return { isOpen, content, open, close }
})