<script setup lang="ts">
import { onBeforeMount, ref, computed } from 'vue'
import type { Book } from '@/modules/types'
import bookCoverPhoto from '@/assets/img/book-cover.png'
import { useBasketStore } from '@/store/store'
import { fixReqString } from '@/modules/utils'

const basketStore = useBasketStore()
const book = ref<Book | null>(null)
const inTheCart = computed(() => !!basketStore.books.find(theBook => theBook.id === book.value?.id))
const isBookRemoving = ref<boolean>(false)

const props = defineProps<{
    volumeId?: string
    propsBook?: Book
}>()

onBeforeMount(async () => {
    if (props.propsBook) {
        book.value = props.propsBook
    } else {
        book.value = await getBookInfo()
    }
})

async function getBookInfo() {
    const res = await fetch(
        `https://www.googleapis.com/books/v1/volumes/${props.volumeId}?key=${
            import.meta.env.VITE_GOOGLE_BOOKS_API_KEY
        }`
    ).then(res => res.json())
    return res
}

function handleRemoveBook(book: Book) {
    isBookRemoving.value = true
    setTimeout(() => {
        isBookRemoving.value = false
        basketStore.removeBookFromBasket(book)
    }, 1000)
}
</script>

<template>
    <article
        class="book"
        :class="{'animate__animated animate__zoomOutDown': isBookRemoving}"
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
                v-if="!!props.propsBook"
                class="book__btn-action btn-primary"
                @click="handleRemoveBook(book)"
            >
                Удалить из корзины
            </button>
            <button
                class="book__btn-action btn-primary"
                @click="basketStore.addBookInBasket(book)"
                :disabled="inTheCart"
                v-else
            >
                {{ inTheCart ? 'В корзине' : 'Добавить в корзину' }}
            </button>
        </div>
    </article>
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

.book__btn-action {
    width: 100%;
}

.book__btn-action:disabled {
    color: #fff;
    background: var(--text-gray);
    border-color: var(--text-gray);
    cursor: default;
}

@media (max-width: 768px) {
    .book__img {
        width: 100%;
        max-width: 160px;
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

    .book__info {
        width: 100%;
    }
}
</style>
@/store/store
