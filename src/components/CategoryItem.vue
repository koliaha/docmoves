<template>
    <div class="category-wrapper" @drop="onDrop($event, data.id)" @dragover.prevent @dragenter.prevent>
        <div class="category" @click="openCategory">
            <ItemLine :data="data" :is-category="true" :is-open="isOpen" />
        </div>
        <div class="subcategory" :class="{ 'isOpen': isOpen }" v-if="getItem.length > 0">
            <div v-for="(item, index) in getItem" :key="index" :draggable="true" @dragstart="onDragStart($event, item)">
                <ItemLine :data="item" />
            </div>
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
            isOpen: true
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
        },
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
.category-wrapper {
    width: 100%;
}

.category {
    cursor: pointer;
}

.subcategory {
    padding-left: 20px;
    max-height: 0;
    overflow: hidden;
    transition: 0.6s ease-out;

    &.isOpen {
        max-height: 2000px;
        transition: 0.6s ease-in;
    }
}
</style>