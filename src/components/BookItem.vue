<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import type { Book } from '@/modules/types'

const props = defineProps<{
    volumeId: string
}>()

const book = ref<Book | null>(null)

onBeforeMount(async () => {
    const res = await fetch(
        `https://www.googleapis.com/books/v1/volumes/${props.volumeId}?key=${
            import.meta.env.VITE_GOOGLE_BOOKS_API_KEY
        }`
    ).then(res => res.json())
    book.value = res
})
</script>

<template>
    <div
        class="book"
        v-if="book"
    >
        <img
            class="book__img"
            :src="book.volumeInfo.imageLinks.small"
            alt="Изображение книги"
        />
        <div class="book__info">
            <div class="book__authors">
                <p
                    class="book__author"
                    v-for="(author, i) in book.volumeInfo.authors"
                    :key="i"
                >
                    {{ author }}
                </p>
            </div>
            <h2 class="book__title">{{ book.volumeInfo.title }}</h2>
        </div>
    </div>
</template>

<style scoped>
.book {
    display: flex;
}

.book__authors {
    display: flex;
    flex-direction: column;
}

.book__author {
    color: var(--text-gray);
    font-family: 'Open Sans';
    font-size: 10px;
}

.book__title {
    font-weight: bold;
}
</style>
