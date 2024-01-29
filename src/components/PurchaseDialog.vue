<script setup lang="ts">
import { useDialogStore } from '@/store/store'

const dialogStore = useDialogStore()
</script>

<template>
    <dialog
        class="dialog"
        :open="dialogStore.isOpen"
        v-if="dialogStore.isOpen"
    >
        <div
            class="dialog__content animate__animated animate__zoomIn animate__faster"
        >
            <h3
                class="dialog__title"
                v-html="dialogStore.content.title"
            ></h3>
            <p
                class="dialog__text"
                v-if="!!dialogStore.content.text"
                v-html="dialogStore.content.text"
            ></p>
            <button
                class="dialog__close"
                v-if="!dialogStore.isNotification"
                @click="dialogStore.close"
            >
                &#10005;
            </button>
            <button
                class="dialog__submit btn-primary"
                v-if="!dialogStore.isNotification"
                @click="dialogStore.buy"
            >
                Купить
            </button>
        </div>
    </dialog>
</template>

<style scoped lang="scss">
.dialog {
    position: fixed;
    z-index: 200;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    border: none;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;

    &__content {
        background: #fff;
        max-width: 80vw;
        border-radius: 20px;
        padding: 40px;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
    }

    &__title {
        font-size: 24px;
        text-align: center;

        &:not(:last-child) {
            margin-bottom: 15px;
        }
    }

    &__text {
        margin-bottom: 25px;
    }

    &__close {
        font-size: 20px;
        position: absolute;
        top: 10px;
        right: 15px;
    }
}
</style>
