<script>
import Event from './Event.vue'
import HorizontalFlexLayout from './HorizontalFlexLayout.vue';

export default {
    props: {
        events: Array,
        attribute: String
    },
    components: {
        Event, HorizontalFlexLayout
    }
}
</script>

<template>
    <HorizontalFlexLayout>
        <Event v-for="event in events" v-bind:label="event[attribute]">
            <slot name="eventLink" :event="event"></slot>
        </Event>
    </HorizontalFlexLayout>
</template>