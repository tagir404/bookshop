<script setup lang="ts">
import { useBasketStore } from '../store/store'
import { fixReqString } from '@/modules/utils'
import bookCoverPhoto from '@/assets/img/book-cover.png'

const basketStore = useBasketStore()
</script>

<template>
    <div class="container">
        <article
            class="book"
            v-for="book in basketStore.books"
            :key="book.id"
        >
            <img
                class="book__img"
                :src="fixReqString(book.volumeInfo.imageLinks?.small) || bookCoverPhoto"
                alt="Обложка книги"
            />
            <div class="book__info">
                <h2 class="book__title">{{ book.volumeInfo.title }}</h2>
                <div class="book__description" v-html="book.volumeInfo.description"></div>
                <p class="book__price">
                    Цена: {{ Math.round(book.saleInfo.retailPrice.amount) }} &#8381;
                </p>
            </div>
        </article>
    </div>
</template>

<style scoped lang="scss">
.container {
    display: flex;
    flex-direction: column;
    gap: 50px;
}

.book {
    display: flex;
    align-items: flex-start;
    border: 1px solid #000;
    border-radius: 10px;
    overflow: hidden;

    &__img {
    }

    &__info {
        display: flex;
        flex-direction: column;
        gap: 30px;
        padding: 30px;
    }

    &__title {
        font-size: 30px;
        font-weight: bold;
    }

    &__price {
        font-size: 20px;
    }
}
</style>
