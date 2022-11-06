<template>
    <div class="doc-item category-item" :class="{ isDragging: isDragging}">
        <!-- && id != 0 -->
        <div class="arrow" :class="{ 'isOpen': isActive }" v-if="isCategory" @click="openCategory">
            <img src="@/assets/icons/arrow.svg" alt="arrow">
        </div>
        <span class="category-title">{{ data.title }}</span>
        <div class="dot-list" v-if="data.dots">
            <DotItem v-for="(item, index) in data.dots" :key="index" :data="item" />
        </div>
        <div class="required" v-if="data.required">Обязательный</div>
        <div class="description" v-if="data.description">
            <span>{{ data.description }}</span>
        </div>
        <div class="item-actions">
            <button class="action-btn edit"><img src="@/assets/icons/pen.svg" alt="pen"></button>
            <button class="action-btn delete" @click="remove"><img src="@/assets/icons/trash.svg" alt="trash"></button>
            <button class="action-btn move" :class="{ moving: isDragging }"><img src="@/assets/icons/move.svg"
                    alt="arrow"></button>
        </div>
    </div>
</template>
<script>
import DotItem from './DotItem.vue'
export default {
    props: ["data", "isCategory", "isDragging",  "id"],
    components: { DotItem },
    data() {
        return {
            isActive: true,
        }
    },
    methods: {
        remove() {
            this.isCategory
                ? this.$store.commit('REMOVE_CATEGORY', this.data)
                : this.$store.commit('REMOVE_ITEM', this.data)
        },
        openCategory() {
            this.isActive = !this.isActive
            this.$emit('isActive', this.isActive)
        },
    },

}
</script>
<style lang="scss">
.doc-item {
    border: 2px solid #DFE4EF;
    background: white;
    width: 100%;
    font-weight: 400;
    font-size: 13px;
    color: #000000;
    padding: 9px;
    position: relative;
    display: flex;
    align-items: center;
    margin-top: -2px;
    cursor: move;
    transition: 0.4s;

    &.isDragging {
        opacity: 0.5;
        // box-shadow: 0px 3px 16px rgba(0, 102, 255, 0.7);
    }

}


.category-title {
    margin-right: 10px;
    user-select: none;
}

.item-actions {
    position: absolute;
    display: flex;
    align-items: center;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);

    .action-btn {
        cursor: pointer;
        margin: 0 10px;
        border: none;
        background: none;
        transition: 0.4s;

        &:hover {
            opacity: 0.7;
        }

        &.moving img {
            filter: invert(28%) sepia(98%) saturate(4719%) hue-rotate(212deg) brightness(104%) contrast(105%);
        }
    }
}

.dot-list {
    display: flex;
    align-items: center;
    margin: 0 10px;


}

.description {
    font-weight: 400;
    font-size: 11px;
    color: #8E9CBB;
    margin: 0 12px;
}

.required {
    color: #FF238D;
    font-size: 11px;
}

.arrow {
    border: 1px solid #D3D8DF;
    border-radius: 50%;
    width: 22px;
    height: 22px;
    position: relative;
    margin-right: 14px;
    transition: transform 0.6s ease;

    img {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    &.isOpen {
        transform: rotate(180deg);
    }
}
</style>