<script setup lang="ts">
import { ref } from 'vue'
import TheBooks from './components/TheBooks.vue'
import TheHeader from './components/TheHeader.vue'
import TheSwiper from './components/TheSwiper.vue'

const basket = ref<string[]>(JSON.parse(localStorage.getItem('basket') || '[]'))

function addInTheCart(bookId: string) {
    basket.value.push(bookId)
    localStorage.setItem('basket', JSON.stringify(basket.value))
}
</script>

<template>
    <TheHeader :basketLength="basket.length" />
    <TheSwiper />
    <TheBooks
        @addInTheCart="addInTheCart"
        :basket="basket"
    />
</template>

<style scoped></style>
