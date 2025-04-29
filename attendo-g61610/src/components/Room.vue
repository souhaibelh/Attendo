<script>
export default {
    props: {
        label: String,
        maxCapacity: Number,
        surveillant: String,
        defaultSupervisor: String,
        currentStudents: {
            type: Number,
            default: 0
        }
    },
    computed: {
        space() {
            const fillPercentage = ( this.currentStudents * 100 ) / this.maxCapacity

            if (fillPercentage >= 100) {
                return 'no-space'
            } else if (fillPercentage >= 70) {
                return 'low-space'
            } else {
                return ''
            }
        }
    }
}
</script>

<template>
    <div class="room-container">
        <div class="max-viewer" v-bind:class="space">
            {{ currentStudents }} / {{ maxCapacity }}
        </div>
        <h1>{{ label }}</h1>
        <p>{{ surveillant ? surveillant : defaultSupervisor }}</p>
        <slot name="link"></slot>
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
    border: 3px solid black;
    width: max-content;
    padding: 6px;
    border-radius: 16px;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-6px, 6px);
    font-size: 12px;
}
.low-space {
    background-color: gold;
}
.no-space {
    background-color: red;
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