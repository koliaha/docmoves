<template>
    <div class="dot-item" :style="{ 'background-color': data }">
    </div>
</template>
<script>
export default {
    props: ["data"]
}
</script>
<style lang="scss">
.dot-item {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #FF238D;
    margin: 0 3px;
    transition: 0.4s;
    &:hover{
        border: 1px solid #000000;
    }
}
</style>