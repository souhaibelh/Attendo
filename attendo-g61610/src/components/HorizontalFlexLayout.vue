<script>
export default {
    props: {
        items: Array
    }
}
</script>

<template>
    <div class="container">
        <slot name="flexChild" :items="items"></slot>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
}
</style>