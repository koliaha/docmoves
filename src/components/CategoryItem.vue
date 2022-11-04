<template>
    <div class="category-wrapper">
        <div class="category" @click="openCategory">
            <ItemLine :data="data" :is-category="true" :is-open="isOpen" />
        </div>
        <div class="subcategory" :class="{'isOpen':isOpen }" v-if="getItem.length > 0">
            <ItemLine v-for="(item, index) in getItem" :key="index" :data="item" />
        </div>
    </div>
</template>
<script>
import ItemLine from './ItemLine.vue'
export default {
    props: ["data"],
    components: {
        ItemLine
    },
    data() {
        return {
            isOpen: false
        }
    },
    computed: {
        getItem() {
            return this.$store.getters.getItemList.filter(el => el.belong == this.data.category)
        }
    },
    methods: {
        openCategory() {
            this.isOpen = !this.isOpen
        }
    },
}
</script>
<style lang="scss">
.category-wrapper {
    width: 100%;
}
.category{
    cursor: pointer;
}
.subcategory {
    padding-left: 20px;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.6s ease-out;
    &.isOpen {
        max-height: 2000px;
        transition: max-height 0.6s ease-in;
    }
}
</style>