<script setup lang="ts">
import { onBeforeMount, ref, watch, computed } from 'vue'
import type { Book } from '@/modules/types'
import bookCoverPhoto from '@/assets/img/book-cover.png'
import { useBasketStore } from '@/store/store'
import { fixReqString } from '@/modules/utils'

const basketStore = useBasketStore()

const props = defineProps<{
    volumeId: string
}>()

const book = ref<Book | null>(null)
const inTheCart = computed(() => !!basketStore.books.find(theBook => theBook.id === book.value?.id))

async function getBookInfo() {
    const res = await fetch(
        `https://www.googleapis.com/books/v1/volumes/${props.volumeId}?key=${
            import.meta.env.VITE_GOOGLE_BOOKS_API_KEY
        }`
    ).then(res => res.json())
    return res
}

onBeforeMount(async () => {
    book.value = await getBookInfo()
})

watch(
    () => props.volumeId,
    async () => {
        book.value = await getBookInfo()
    }
)
</script>

<template>
    <div
        class="book"
        v-if="book"
    >
        <img
            class="book__img"
            :src="fixReqString(book.volumeInfo.imageLinks?.small) || bookCoverPhoto"
            alt="Изображение книги"
        />

        <div class="book__info">
            <div class="book__authors">
                <span
                    class="book__author"
                    v-for="(author, i) in book.volumeInfo.authors"
                    :key="i"
                >
                    <template v-if="i > 0">, </template>{{ author }}
                </span>
            </div>
            <h2 class="book__title">{{ book.volumeInfo.title }}</h2>
            <div
                class="book__description"
                v-if="book.volumeInfo.description"
                v-html="book.volumeInfo.description"
            ></div>
            <p class="book__price">{{ Math.round(book.saleInfo.retailPrice.amount) }} &#8381;</p>
            <button
                class="book__btn-buy btn-primary"
                @click="basketStore.addBookInBasket(book)"
                :disabled="inTheCart"
            >
                {{ inTheCart ? 'В корзине' : 'Добавить в корзину' }}
            </button>
        </div>
    </div>
</template>

<style scoped>
.book {
    display: flex;
    align-items: center;
    gap: 36px;
}

.book__img {
    width: 212px;
    box-shadow: 0px 24px 24px 0px rgba(53, 49, 84, 0.28);
}

.book__info {
    width: 176px;
}

.book__authors {
    margin-bottom: 5px;
    overflow: hidden;
    display: -webkit-box;
    line-clamp: 3;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
}

.book__author {
    color: var(--text-gray);
    font-family: 'Open Sans';
    font-size: 12px;
}

.book__title {
    font-weight: bold;
    margin-bottom: 20px;
}

.book__description {
    font-size: 12px;
    margin-bottom: 16px;
    width: 100%;
    overflow: hidden;
    display: -webkit-box;
    line-clamp: 3;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
}

.book__price {
    font-size: 13px;
    font-weight: bold;
    margin-bottom: 16px;
}

.book__btn-buy {
    width: 100%;
}

.book__btn-buy:disabled {
    color: #fff;
    background: var(--text-gray);
    border-color: var(--text-gray);
    cursor: default;
}

@media (max-width: 768px) {
    .book__img {
        width: 150px;
    }

    .book__info {
        width: 150px;
    }
}

@media (max-width: 600px) {
    .book {
        flex-direction: column;
        width: 100%;
    }

    .book__img {
        width: 100%;
        max-width: 160px;
    }

    .book__info {
        width: 100%;
    }
}
</style>
@/store/store
