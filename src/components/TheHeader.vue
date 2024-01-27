<script setup lang="ts">
import { useBasketStore, useBalanceStore } from '@/store/store'

const basketStore = useBasketStore()
const balanceStore = useBalanceStore()
</script>

<template>
    <header>
        <div class="container">
            <RouterLink to="/" class="shopname">Bookshop</RouterLink>
            <p class="balance">Баланс: {{ balanceStore.balance }} &#8381;</p>
            <div class="header-btns">
                <button class="btn-user"></button>
                <RouterLink to="/basket" class="btn-bag">
                    <span v-if="basketStore.books.length">{{ basketStore.books.length }}</span>
                </RouterLink>
            </div>
        </div>
    </header>
</template>

<style scoped>
header {
    position: fixed;
    top: 0;
    z-index: 100;
    width: 100%;
    background: #fff;
    height: 116px;
    display: flex;
    align-items: center;
    box-shadow: 1px 1px 40px #f7f7f7;
}

.container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 30px;
}

.shopname {
    font-size: 24px;
    font-weight: 700;
}

.balance {
    font-size: 20px;
    margin-left: auto;
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

.btn-bag {
    width: 14px;
    height: 17px;
    background: url('@/assets/img/bag.svg') no-repeat center;
    position: relative;
}

.btn-bag span {
    color: #fff;
    font-size: 10px;
    font-weight: 500;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 13px;
    min-height: 13px;
    border-radius: 50%;
    background: #ff353a;
    position: absolute;
    bottom: -7px;
    right: -7px;
}

@media (max-width: 768px) {
    header {
        height: auto;
        padding-top: 20px;
        padding-bottom: 20px;
    }

    .container {
        gap: 15px;
    }

    .shopname {
        font-size: 18px;
    }

    .balance {
        font-size: 14px;
    }

    .header-btns {
        gap: 15px;
    }
}
</style>