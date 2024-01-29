<script setup lang="ts">
import { getImgUrl } from '@/modules/utils'
import { register } from 'swiper/element/bundle'
register()
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
                <img
                    :src="getImgUrl(slide)"
                    :alt="`Слайд ${i + 1}`"
                />
            </swiper-slide>
        </swiper-container>
    </div>
</template>

<style scoped></style>
