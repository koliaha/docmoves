<template>
    <div class="search-field" :class="{ focused: focus }">
        <img src="@/assets/icons/loop.svg" alt="">
        <input class="search-input" @focus="focus = true" @focusout="focus = false" type="text" placeholder="Документы"
            v-model="search">
        <button v-if="search" @click="search = ''" class="search-btn"><img src="@/assets/icons/close.svg"
                alt="close"></button>
    </div>
</template>
<script>
export default {
    data() {
        return {
            search: '',
            focus: false
        }
    },
    watch: {
        search(newVar) {
            this.$store.commit('SEARCH__FIELD',newVar)
        }
    },
    computed: {
        filteredList() {
            return this.postList.filter(post => {
                return post.title.toLowerCase().includes(this.search.toLowerCase())
            })
        }
    }
}
</script>
<style lang="scss">
.search-field {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #DFE4EF;
    max-width: 564px;
    width: 100%;
    position: relative;
    padding: 5px 0;
    transition: 0.4s;

    &.focused {
        border-bottom: 1px solid #0066FF;
    }

    .search-input {
        border: none;
        width: 100%;
        outline: none;
        padding: 5px;
    }

    .search-btn {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        background: none;
        border: none;
        cursor: pointer;
    }
}
</style>