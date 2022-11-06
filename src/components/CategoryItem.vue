<template>
    <div class="category-wrapper" @drop="onDrop($event, data.id)" @dragover.prevent @dragenter.prevent>
        <div class="category">
            <ItemLine :data="data" :is-category="true" @isActive="open"  />
        </div>
        <div class="subcategory" v-if="getItem.length > 0">
            <transition-group :name="'list'">
                <div v-for="(item, index) in getItem" :key="index" :draggable="true"
                    @dragstart="onDragStart($event, item)" @dragover.prevent @dragenter="onDragEnter(item)"
                    @dragend="onDragEnd($event)">
                    <!-- && !isCatdragging -->
                    <transition name="accordion" @enter="start" @after-enter="end" @before-leave="start"
                        @after-leave="end">
                        <div class="accordion__content" v-show="isOpen">
                            <ItemLine :data="item" :id="index" :is-dragging="isDragging == item.id ? true : false"
                                :class="{ isOver: getOverDraging == item.id && getDragStatus }" />
                        </div>
                    </transition>
                </div>
            </transition-group>
        </div>
    </div>
</template>
<script>
import ItemLine from './ItemLine.vue'
export default {
    props: ["data", "isCatdragging", "isCatover"],
    components: {
        ItemLine
    },
    data() {
        return {
            dragItem: null,
            dragOverItem: null,
            isDragging: null,
            isOver: null,
            isOpen: true
        }
    },
    computed: {
        getItem() {
            return this.$store.getters.getItemList.filter(el => el.belong == this.data.category)
        },
        getDragStatus() {
            return this.$store.getters.getDragStatus
        },
        getOverDraging() {
            return this.$store.getters.getOverDraging
        }
    },
    methods: {
        open(bool) {
            this.isOpen = bool
        },
        onDragStart(event, item) {
            event.dataTransfer.dropEffect = 'move'
            event.dataTransfer.effectAllowed = 'move'
            event.dataTransfer.setData('itemId', item.id.toString())
            this.dragItem = item
            this.isDragging = item.id
            // setTimeout(() => {
            //     event.target.style.display = "none"
            // })
        },
        onDrop(event, id = 0) {
            const itemId = event.dataTransfer.getData('itemId')
            this.$store.commit('SET_CATEGORY', { itemId, id })
            this.isOver = null
            this.$store.commit('SET_DRAG', false)

        },
        onDragEnter(item) {
            this.dragOverItem = item
            this.isOver = item.id
            this.$store.commit('SET_DRAG', true)
            this.$store.commit('SET_OVERDRAG', item.id)
        },
        onDragEnd() {
            this.isDragging = null
            this.isOver = null
            // event.target.style.display = "block"
            this.$store.commit('SET_SORTING', { dragItem: this.dragItem, dragOverItem: this.dragOverItem, })
            this.$store.commit('SET_DRAG', false)

        },
        start(el) {
            el.style.height = el.scrollHeight + "px";
        },
        end(el) {
            el.style.height = "";
        },

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

    &.isOpen {
        max-height: 100%;
    }
}

.accordion__item {
    cursor: pointer;
    padding: 10px 20px 10px 40px;
    border-bottom: 1px solid #ebebeb;
    position: relative;
}

.accordion__trigger {
    display: flex;
    justify-content: space-between;
}

.accordion-enter-active,
.accordion-leave-active {
    will-change: height, opacity;
    transition: height 0.3s ease, opacity 0.3s ease;
    overflow: hidden;
}

.accordion-enter,
.accordion-leave-to {
    height: 0 !important;
    opacity: 0;
}
</style>