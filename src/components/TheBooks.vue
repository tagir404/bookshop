<script setup lang="ts">
import subjects from '@/modules/subjects'
import { onBeforeMount, ref } from 'vue'
import type { Book } from '@/modules/types'
import BookItem from './BookItem.vue';

const currentSubject = ref(subjects[0])
const bookList = ref<Array<Book>>([])

onBeforeMount(async () => {
    const res = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=subject${currentSubject.value}&maxResults=15&key=${import.meta.env.VITE_GOOGLE_BOOKS_API_KEY}`
    ).then(res => res.json())
    bookList.value = res.items
})
</script>

<template>
    <section>
        <div class="container">
            <aside>
                <ul class="subjects">
                    <li
                        class="subject"
                        :class="{ active: subject === currentSubject }"
                        v-for="(subject, i) in subjects"
                        :key="i"
                        @click="currentSubject = subject"
                    >
                        {{ subject }}
                    </li>
                </ul>
            </aside>
            <div class="book-list" v-if="bookList.length">
                <BookItem v-for="(book, i) in bookList" :key="i" :volumeId="book.id" />
            </div>
        </div>
    </section>
</template>

<style scoped>
.container {
    display: flex;
}

.subjects {
    display: flex;
    flex-direction: column;
    gap: 23px;
}

.subject {
    color: var(--text-gray);
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
}

.subject.active {
    color: var(--text-black);
    font-size: 16px;
    font-weight: bold;
    display: flex;
    align-items: center;
}

.subject.active::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #756ad3;
    margin-right: 14px;
}

.book-list {
    display: flex;
    flex-wrap: wrap;
    gap: 90px 75px;
}
</style>
