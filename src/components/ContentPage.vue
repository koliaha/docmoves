<template>
    <div class="content-wrapper">
        <SearchField class="content-search" />
        <div class="category-list" v-for="item in getCategory" :key="item.id">
            <CategoryItem :data="item" />
        </div>
        <div class="category-list noncategory" v-if="getItem.length > 0" @drop="onDrop($event)"
            @dragover.prevent @dragenter.prevent>
            <div v-for="(item, index) in getItem" :key="index" :draggable="true" @dragstart="onDragStart($event, item)">
                <ItemLine :data="item" />
            </div>
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
    },
    methods: {
        onDragStart(event, item) {
            event.dataTransfer.dropEffect = 'move'
            event.dataTransfer.effectAllowed = 'move'
            event.dataTransfer.setData('itemId', item.id.toString())
        },
        onDrop(event, id = 0) {
            const itemId = event.dataTransfer.getData('itemId')
            this.$store.commit('SET_CATEGORY', { itemId, id })
        }
    },
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