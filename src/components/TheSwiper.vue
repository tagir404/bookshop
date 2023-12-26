<script setup lang="ts">
import { register } from 'swiper/element/bundle'
register()

const slides = [
    './src/assets/img/slides/1.jpg',
    './src/assets/img/slides/2.jpg',
    './src/assets/img/slides/3.jpg'
]

</script>

<template>
    <div class="container">
        <swiper-container :pagination="true" :autoplay="true" :loop="true">
            <swiper-slide v-for="(slide, i) in slides" :key="i">
                <img :src="slide" :alt="`Слайд ${i + 1}`" />
            </swiper-slide>
        </swiper-container>
    </div>
</template>

<style scoped></style>
