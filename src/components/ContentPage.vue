<template>
    <div class="content-wrapper">
        <SearchField class="content-search" />
        <div class="category-list" v-for="item in getCategory" :key="item.id">
            <CategoryItem :data="item" />
        </div>
        <div class="category-list noncategory" v-if="getItem.length > 0">
            <ItemLine v-for="(item, index) in getItem" :key="index" :data="item" />
        </div>
    </div>
</template>
<script>
import SearchField from './SearchField.vue'
import CategoryItem from './CategoryItem.vue'
import ItemLine from './ItemLine.vue'
export default {
    components: {
        SearchField,
        CategoryItem,
        ItemLine
    },
    computed: {
        getItem() {
            return this.$store.getters.getItemList.filter(el => el.belong == 0)
        },
        getCategory() {
            return this.$store.getters.getCategoryList
        }
    }
}
</script>
<style lang="scss">
.content-search {
    margin-top: 25px;
    margin-bottom: 20px;
}

.content-wrapper {
    display: flex;
    flex-direction: column;
    align-items: start;
    text-align: left;
}

.category-list {
    width: 100%;
}

.noncategory {
    margin-top: 15px;
}
</style>