<script setup lang="ts">
import type { Book } from '@/modules/types';

defineProps<{
    book: Book
}>()
</script>

<template>
    <div
        class="book"
    >
        <img
            class="book__img"
            :src="book.volumeInfo.imageLinks.thumbnail"
            alt="Изображение книги"
        />
        <div class="book__info">
            <div class="authors">
                <p
                    class="author"
                    v-for="(author, i) in book.volumeInfo.authors"
                    :key="i"
                >
                    {{ author }}
                </p>
            </div>
            <h2 class="title">{{ book.volumeInfo.title }}</h2>
        </div>
    </div>
</template>

<style scoped></style>
