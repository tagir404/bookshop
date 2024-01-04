<script setup lang="ts">
import nav from '@/modules/nav'

const props = defineProps<{
    basketLength: number
}>()
</script>

<template>
    <header>
        <div class="container">
            <p class="shopname">Bookshop</p>
            <nav>
                <ul class="nav-list">
                    <li
                        v-for="(item, i) in nav"
                        :key="i"
                    >
                        <a
                            class="nav-link"
                            :href="item.link"
                            >{{ item.text }}</a
                        >
                    </li>
                </ul>
            </nav>
            <div class="header-btns">
                <button class="btn-user"></button>
                <button class="btn-search"></button>
                <button class="btn-bag">
                    <span v-if="props.basketLength">{{ props.basketLength }}</span>
                </button>
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
}

@media (max-width: 768px) {
    header {
        height: auto;
        padding-top: 20px;
        padding-bottom: 20px;
    }

    .container {
        flex-wrap: wrap;
        gap: 15px;
    }

    .shopname {
        font-size: 22px;
        order: 1;
    }

    .header-btns {
        order: 2;
        gap: 15px;
    }

    nav {
        order: 3;
        width: 100%;
    }

    .nav-list {
        gap: 15px;
        text-align: center;
    }

    .nav-link {
        text-align: center;
    }
}
</style>
