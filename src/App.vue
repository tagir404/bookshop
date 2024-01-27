<script setup lang="ts">
import { onMounted, ref } from 'vue';
import TheHeader from './components/TheHeader.vue'

const headerHeight = ref(0)

onMounted(() => {
    headerHeight.value = document.querySelector('header')?.offsetHeight || 0
})
</script>

<template>
    <TheHeader />
    <main :style="`margin-top: ${headerHeight}px`">
        <RouterView />
    </main>
</template>

<style scoped>
main {
    padding-top: 30px;
    padding-bottom: 30px;
}
</style>
