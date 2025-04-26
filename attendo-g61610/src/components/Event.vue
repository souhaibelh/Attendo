<script>
export default {
    props: {
        label: String
    }
}
</script>

<template>
    <div class="event-container">
        <p>{{ label }}</p>
    </div>
</template>

<style scoped>
.event-container {
    height: 150px;
    width: 125px;
    background-color: lightgray;
    box-shadow: 0px 2px 4px rgba(0,0,0,75%);
    box-sizing: border-box;
    border-radius: 12px;
}

.event-container > p {
    text-align: center;
    padding: 5px;
}

.event-container:hover {
    outline: 2px solid black;
}
</style>