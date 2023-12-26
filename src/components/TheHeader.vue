<script setup lang="ts">
import nav from '@/modules/nav'
</script>

<template>
    <header>
        <div class="container">
            <p class="shopname">Bookshop</p>
            <nav>
                <ul class="nav-list">
                    <li v-for="(item, i) in nav" :key="i">
                        <a class="nav-link" :href="item.link">{{ item.text }}</a>
                    </li>
                </ul>
            </nav>
            <div class="header-btns">
                <button class="btn-user"></button>
                <button class="btn-search"></button>
                <button class="btn-bag"></button>
            </div>
        </div>
    </header>
</template>

<style scoped>
header {
    height: 116px;
    display: flex;
    align-items: center;
}

.container {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.shopname {
    font-size: 24px;
    font-weight: 700;
}

.nav-list {
    display: flex;
    gap: 40px;
}

.nav-link {
    color: var(--text-gray);
    font-size: 10px;
    font-weight: bold;
    text-transform: uppercase;
}

.header-btns {
    display: flex;
    align-items: center;
    gap: 30px;
}

.btn-user {
    width: 12px;
    height: 15px;
    background: url('@/assets/img/user.svg') no-repeat center;
}

.btn-search {
    width: 15px;
    height: 15px;
    background: url('@/assets/img/search.svg') no-repeat center;
}

.btn-bag {
    width: 14px;
    height: 17px;
    background: url('@/assets/img/bag.svg') no-repeat center;
}
</style>
