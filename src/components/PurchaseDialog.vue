<script setup lang="ts">
import { useDialogStore } from '@/store/store'

const dialogStore = useDialogStore()
</script>

<template>
    <dialog
        v-if="dialogStore.isOpen"
        class="dialog"
        :open="dialogStore.isOpen"
        data-test="dialog-container"
    >
        <div class="dialog__content animate__animated animate__zoomIn animate__faster">
            <h3
                class="dialog__title"
                v-html="dialogStore.content.title"
            ></h3>
            <p
                v-if="!!dialogStore.content.text"
                class="dialog__text"
                v-html="dialogStore.content.text"
            ></p>
            <button
                v-if="!dialogStore.isNotification"
                class="dialog__close"
                @click="dialogStore.close"
            >
                &#10005;
            </button>
            <button
                v-if="!dialogStore.isNotification"
                class="dialog__submit btn-primary"
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
        text-align: center;
    }

    &__title {
        font-size: 24px;

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

@media (max-width: 768px) {
    .dialog {
        &__content {
            padding: 20px 40px;
        }

        &__title {
            font-size: 18px;
        }

        &__text {
            font-size: 14px;
        }
    }
}
</style>
