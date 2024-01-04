<script setup lang="ts">
import { register } from 'swiper/element/bundle'
register()

function getImageUrl(index: number) {
  return new URL(`../assets/img/slides/${index}.jpg`, import.meta.url).href
}
</script>

<template>
    <div class="container">
        <swiper-container
            :pagination="true"
            :autoplay="true"
            :loop="true"
            class="main-swiper"
        >
            <swiper-slide
                v-for="(slide, i) in 3"
                :key="i"
            >
                <img :src="getImageUrl(slide)" :alt="`Слайд ${i + 1}`" />
            </swiper-slide>
        </swiper-container>
    </div>
</template>

<style scoped></style>
