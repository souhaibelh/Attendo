<template>
    <div class="events-container">
        <slot></slot>
    </div>
</template>

<style scoped>
.events-container {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
}
</style>