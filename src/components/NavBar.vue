<template>
    <div class="nav-content">
        <h2 class="nav-title">Документы</h2>
        <div class="nav-list">
            <button class="btn">
                <img src="@/assets/icons/zakl.svg" alt="">
            </button>
            <button class="btn"> <img src="@/assets/icons/plus.svg" alt=""><span> Новый тип</span></button>
            <button class="btn"> <img src="@/assets/icons/plus.svg" alt=""><span>Новый документ</span></button>
        </div>
    </div>
</template>
<script>
export default {

}
</script>
<style lang="scss">
.nav-content {
    display: flex;
    justify-content: space-between;
    align-items: center;

}

.nav-list {
    display: flex;
    align-items: center;
}

.btn {
    border: 1px solid #D3D8DF;
    border-radius: 50px;
    font-weight: 500;
    font-size: 12px;
    line-height: 30px;
    color: #000000;
    padding: 0 10px;
    background: none;
    cursor: pointer;
    margin: 0 5px;
    display: flex;
    align-items: center;
    min-width: 30px;
    min-height: 30px;

    span {
        margin-left: 5px;
    }
}
</style>