<script setup lang="ts">
import { computed, ref } from 'vue'
import { useBasketStore, useDialogStore } from '../store/store'
import BookItem from '@/components/BookItem.vue'

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
        <h1>Корзина {{ !basketStore.books.length ? 'пуста' : '' }}</h1>

        <div
            v-if="basketStore.books.length"
            class="book-list"
        >
            <TransitionGroup>
                <BookItem
                    v-for="book in basketStore.books"
                    :key="book.id"
                    :book="book"
                    :type="'basket'"
                >
                </BookItem>
            </TransitionGroup>
        </div>

        <div
            v-if="basketStore.totalPrice > 0"
            ref="basketFooter"
            class="basket-footer"
        >
            <div class="basket-footer__total">
                Общая сумма: {{ basketStore.totalPrice }} &#8381;
            </div>
            <button
                class="btn-primary"
                @click="dialogStore.open"
            >
                Подтвердить покупку
            </button>
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

h2 {
    font-size: 22px;
    text-align: center;
}

.book-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 91px 50px;
}

.basket-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #fff;
    z-index: 50;
    padding: 20px;
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
        font-size: 20px;
        margin-bottom: 20px;
    }

    .book-list {
        gap: 40px;
    }

    .basket-footer {
        flex-direction: column;
        align-items: center;
        gap: 15px;
        padding: 15px 20px;

        &__total {
            font-size: 14px;
        }
    }
}
</style>
