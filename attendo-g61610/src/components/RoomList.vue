<script>
import Room from './Room.vue'
import HorizontalFlexLayout from './HorizontalFlexLayout.vue';

export default {
    props: {
        rooms: Array,
    },
    components: {
        Room, HorizontalFlexLayout
    }
}
</script>

<template>
    <HorizontalFlexLayout>
        <Room
            v-for="room in rooms" 
            v-bind:default-supervisor="'Surveillant'" 
            v-bind:label="room.label" 
            v-bind:max-capacity="room.capacity" 
            v-bind:surveillant="room.examination_room.at(0).supervisor"/>
    </HorizontalFlexLayout>
</template>