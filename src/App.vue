<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useDialogStore } from '@/store/store';
import TheHeader from '@/components/TheHeader.vue'
import PurchaseDialog from '@/components/PurchaseDialog.vue'

const dialogStore = useDialogStore()
const headerHeight = ref(0)

onMounted(() => {
    headerHeight.value = document.querySelector('header')?.offsetHeight || 0
})

watch(() => dialogStore.isOpen, () => {
    if(dialogStore.isOpen) {
        document.querySelector('body')?.classList.add('modal-open')
    } else {
        document.querySelector('body')?.classList.remove('modal-open')
    }
})
</script>

<template>
    <TheHeader />
    <main :style="`margin-top: ${headerHeight}px`">
        <RouterView />
    </main>
    <PurchaseDialog />
</template>

<style scoped>
main {
    padding-top: 30px;
    padding-bottom: 30px;
}
</style>
