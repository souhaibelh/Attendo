<script>
export default {
    props: {
        label: String,
        maxCapacity: Number,
        surveillant: String,
        defaultSupervisor: String,
        currentStudents: {
            type: String,
            default: '0'
        }
    }
}
</script>

<template>
    <div class="room-container">
        <div class="max-viewer">
            {{ currentStudents }} / {{ maxCapacity }}
        </div>
        <h1>{{ label }}</h1>
        <p>{{ surveillant ? surveillant : defaultSupervisor }}</p>
        <slot></slot>
    </div>
</template>

<style scoped>
.room-container {
    outline: 1px solid black;
    border-radius: 4px;
    width: 150px;
    position: relative;
    box-sizing: border-box;
}
.room-container:hover {
    outline: 2px solid black;
}
.max-viewer {
    border: 1px solid #FEF4C6;
    width: max-content;
    padding: 8px;
    border-radius: 16px;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-6px, 6px);
    font-size: 12px;
}
h1 {
    margin: unset;
    padding: 14px;
    border-bottom: 1px solid gray;
}
p {
    margin: unset;
    padding: 6px;
    font-weight: 600;
}
</style>