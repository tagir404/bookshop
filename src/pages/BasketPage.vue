<script setup lang="ts">
import { computed, ref } from 'vue'
import { useBasketStore, useDialogStore } from '../store/store'
import { fixReqString } from '@/modules/utils'
import bookCoverPhoto from '@/assets/img/book-cover.png'

const basketFooter = ref<HTMLElement>()
const basketStore = useBasketStore()
const dialogStore = useDialogStore()
const containerPaddingBottom = computed(() => basketFooter.value?.offsetHeight)
</script>

<template>
    <div
        class="container"
        :style="`padding-bottom: ${containerPaddingBottom}px`"
    >
        <h1>Корзина</h1>

        <div class="book-list">
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
                    <div
                        class="book__description"
                        v-html="book.volumeInfo.description.slice(0, 400) + '...'"
                    ></div>
                    <p class="book__price">
                        Цена: {{ Math.round(book.saleInfo.retailPrice.amount) }} &#8381;
                    </p>
                </div>
            </article>
        </div>

        <div
            class="basket-footer"
            ref="basketFooter"
        >
            <div class="basket-footer__total">
                Общая сумма: {{ basketStore.totalPrice }} &#8381;
            </div>
            <button class="btn-primary" @click="dialogStore.open">Подтвердить покупку</button>
        </div>
    </div>
</template>

<style scoped lang="scss">
.container {
    display: flex;
    flex-direction: column;
}

h1 {
    font-weight: bold;
    font-size: 44px;
    text-align: center;
    margin-bottom: 50px;
}

.book-list {
    display: flex;
    flex-direction: column;
    gap: 50px;
}

.book {
    display: flex;
    border: 2px solid var(--text-gray);
    overflow: hidden;

    &__img {
        align-self: flex-start;
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
        font-weight: 500;
        font-size: 24px;
        margin-top: auto;
    }
}

.basket-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #fff;
    z-index: 50;
    padding: 20px 0;
    border-top: 2px solid var(--text-gray);
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 50px;

    &__total {
        font-weight: 500;
        font-size: 24px;
    }
}

@media (max-width: 768px) {
    h1 {
        font-size: 24px;
        margin-bottom: 30px;
    }

    .book {
        flex-direction: column;

        &__info {
            padding: 25px;
            gap: 20px;
        }

        &__title {
            font-size: 20px;
        }

        &__description {
            font-size: 14px;
        }

        &__price {
            font-size: 18px;
        }
    }
}
</style>
