<script>
import Event from './Event.vue'

export default {
    props: {
        events: Array,
        attribute: String
    },
    components: {
        Event
    }
}
</script>

<template>
    <div class="events-container">
        <Event v-for="event in events" v-bind:label="event[attribute]"/>
    </div>
</template>

<style scoped>
.events-container {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
}
</style>