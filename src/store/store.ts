import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Book } from '@/modules/types'

export const useBasketStore = defineStore('basket', () => {
  const balanceStore = useBalanceStore()
  const books = ref<Book[]>(JSON.parse(localStorage.getItem('basket') || '[]'))

  function addBookInBasket(book: Book) {
    if (balanceStore.balance > book.saleInfo.retailPrice.amount) {
      balanceStore.balance = Math.round(balanceStore.balance - book.saleInfo.retailPrice.amount)
      books.value.push(book)
      localStorage.setItem('basket', JSON.stringify(books.value))
    } else {
      console.error('Недостаточно на балансе');
    }

  }

  return { books, addBookInBasket }
})

export const useBalanceStore = defineStore('balance', () => {
  const balance = ref<number>(1000)

  return { balance }
})