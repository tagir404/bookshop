<script setup lang="ts">
import subjects from '@/modules/subjects'
import { onBeforeMount, ref, watch } from 'vue'
import type { Book } from '@/modules/types'
import BookItem from './BookItem.vue'

const currentSubject = ref(subjects[0])
const bookList = ref<Array<Book>>([])
const reqStartIndex = ref(0)
const noMoreBooksState = ref(false)
const step = 6

async function getBookList() {
    const res = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=subject:${encodeURIComponent(
            currentSubject.value
        )}&langRestrict=ru&filter=paid-ebooks&startIndex=${reqStartIndex.value}&maxResults=6&key=${
            import.meta.env.VITE_GOOGLE_BOOKS_API_KEY
        }`
    )
        .then(res => res.json())
        .then(data => data.items)
    return res
}

async function loadMoreBooks() {
    reqStartIndex.value += step
    const newBooks = await getBookList()
    newBooks ? bookList.value.push(...newBooks) : noMoreBooks()
}

watch(currentSubject, async () => {
    noMoreBooksState.value = false
    reqStartIndex.value = 0
    bookList.value = await getBookList()
})

onBeforeMount(async () => {
    bookList.value = await getBookList()
})

function noMoreBooks() {
    noMoreBooksState.value = true
}
</script>

<template>
    <section class="main">
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
            <div class="books">
                <div
                    class="book-list"
                    v-if="bookList?.length"
                >
                    <BookItem
                        class="book-item"
                        v-for="book in bookList"
                        :key="book.id"
                        :volumeId="book.id"
                    />
                </div>
                <button
                    class="more-books-btn btn-primary"
                    @click="loadMoreBooks"
                    v-if="!noMoreBooksState && bookList?.length"
                >
                    Load more
                </button>
            </div>
        </div>
    </section>
</template>

<style scoped>
.main {
    padding-top: 20px;
}

.container {
    display: flex;
    align-items: flex-start;
}

aside {
    padding: 45px 0 81px 0;
    background: #efeef6;
    position: relative;
}

aside::before {
    content: '';
    display: flex;
    background-color: inherit;
    position: absolute;
    left: -1000vw;
    right: -90px;
    top: 0;
    bottom: 0;
    z-index: -1;
}

.subjects {
    display: flex;
    flex-direction: column;
    gap: 23px;
    white-space: nowrap;
    min-width: 190px;
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
    min-width: 6px;
    min-height: 6px;
    border-radius: 50%;
    background: #756ad3;
    margin-right: 14px;
}

.books {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-bottom: 45px;
}

.book-list {
    padding-left: 24px;
    padding-top: 45px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 91px 50px;
    margin-bottom: 84px;
}

.more-books-btn {
    align-self: center;
}

@media (max-width: 768px) {
    .subjects {
        min-width: 150px;
        gap: 15px;
    }

    .subject {
        font-size: 10px;
    }

    .subject.active {
        font-size: 12px;
    }
}

@media (max-width: 600px) {
    .container {
        flex-direction: column;
    }

    aside {
        padding-top: 20px;
        padding-bottom: 20px;
        margin-bottom: 20px;
    }

    aside::before {
        left: -20px;
        right: -20px;
    }

    .subjects {
        flex-direction: row;
        flex-wrap: wrap;
        max-width: 100%;
        justify-content: space-between;
        gap: 10px;
    }

    .subject.active::before {
        margin-right: 7px;
    }

    .book-list {
        padding: 0;
        gap: 40px;
        margin-bottom: 40px;
    }
}
</style>
