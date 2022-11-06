<template>
    <div class="content-wrapper">
        <SearchField class="content-search" />
        <div class="category-drop">
            <transition-group :name="'list'">
                <div class="category-list" v-for="item in getCategory" :key="item.id" :draggable="true"
                    @dragstart="onDragCatStart($event, item)" @dragover.prevent @dragenter="onDragCatEnter(item)"
                    @dragend="onDragCatEnd">
                    <CategoryItem :data="item" :is-catdragging="isCatDragging == item.id ? true : false"
                        :is-catover="(isCatOver == item.id) ? true : false"
                        :class="{ isOver: (getOverDraging == item.id && getDragStatus) }" />
                </div>
            </transition-group>
        </div>
        <div class="category-list noncategory" @drop.prevent="onDrop($event)" @dragover.prevent @dragenter.prevent>
            <transition-group :name="'list'">
                <div v-for="(item, index) in getItem" :key="index" :draggable="true"
                    @dragstart="onDragStart($event, item)" @dragenter="onDragEnter(item)" @dragover.prevent
                    @dragend="onDragEnd($event)">
                    <ItemLine :data="item" :id="index" :is-dragging="isDragging == item.id ? true : false"
                        :class="{ isOver: (getOverDraging == item.id && getDragStatus) }" />
                </div>
            </transition-group>
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
    data() {
        return {
            dragItem: null,
            dragOverItem: null,
            isDragging: null,
            isOver: null,
            dragCat: null,
            dragOverCat: null,
            isCatDragging: null,
            isCatOver: null,
        }
    },
    computed: {
        getItem() {
            return this.$store.getters.getItemList.filter(el => el.belong == 0)
        },
        getCategory() {
            return this.$store.getters.getCategoryList
        },
        getDragStatus() {
            return this.$store.getters.getDragStatus
        }, 
        getOverDraging() {
            return this.$store.getters.getOverDraging
        }
    },
    methods: {
        onDragStart(event, item) {
            this.dragItem = item
            this.isDragging = item.id
            // event.dataTransfer.dropEffect = 'move'
            // event.dataTransfer.effectAllowed = 'move'
            event.dataTransfer.setData('itemId', item.id.toString())
            // setTimeout(() => {
            //     event.target.style.display = "none"
            // })
        },
        onDrop(event, id = 0) {
            const itemId = event.dataTransfer.getData('itemId')
            this.isOver = null
            this.isCatOver = null
            this.$store.commit('SET_CATEGORY', { itemId, id })
            this.$store.commit('SET_DRAG', false)

        },
        onDragEnter(item) {
            this.dragOverItem = item
            this.isOver = item.id
            this.$store.commit('SET_DRAG', true)
            this.$store.commit('SET_OVERDRAG', item.id)
        },
        onDragEnd() {
            // event.target.style.display = "block"
            this.isDragging = null
            this.isOver = null
            this.$store.commit('SET_SORTING', { dragItem: this.dragItem, dragOverItem: this.dragOverItem, })
            this.$store.commit('SET_DRAG', false)

        },

        onDragCatStart(event, item) {
            this.isCatDragging = item.id
            this.dragCat = item

        },
        onDragCatEnter(item) {
            this.dragOverCat = item
            this.isCatOver = item.id
            this.$store.commit('SET_DRAG', true)
            // this.$store.commit('SET_OVERDRAG', item.id)

        },
        onDragCatEnd() {
            this.isCatDragging = null
            this.isCatOver = null
            this.$store.commit('SET_SORT_CATEGORY', { dragItem: this.dragCat, dragOverItem: this.dragOverCat, })
            this.$store.commit('SET_DRAG', false)

        },
    },
}
</script>
<style lang="scss">
.content-search {
    margin-top: 25px;
    margin-bottom: 20px;
}

.category-drop {
    width: 100%;
    height: 100%;
    transition: 0.5s;
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
    padding-bottom: 20px;
}

.isOver {
    border-top: 5px solid #0066FF;
    // margin-top: 30px;
    transition: 0.4s;
}

.list-enter-active,
.list-leave-active {
    transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateX(30px);
}
</style>