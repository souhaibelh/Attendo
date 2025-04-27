<script>
import {getAll} from '../service/listLocalService.js'
import {getEventRooms, add as addExamination} from '../service/listExaminationRoomService.js'
import SelectInput from '../components/SelectInput.vue'
import Room from '../components/Room.vue'
import RoomList from '../components/RoomList.vue'

export default {
    props: {
        sId: String,
        ue: String,
        eId: String
    },
    data() {
        return {
            rooms: [],
            eventRooms: [],
            room: null
        }
    },
    mounted() {
        this.fetchData()
    },
    methods: {
        async fetchData() {
            this.rooms = await getAll()
            this.fetchEventRooms()
        },
        async fetchEventRooms() {
            this.eventRooms = await getEventRooms(this.eId)
        },
        async add() {
            await addExamination(this.eId, this.room)
            this.fetchEventRooms()
        },
    },
    computed: {
        roomsFiltered() {
            const flattenedEventRooms = this.eventRooms.map(item => item.label)
            return this.rooms.filter(item => !flattenedEventRooms.includes(item.label))
        }
    },
    components: {
        SelectInput, RoomList
    }
}
</script>

<template>
    <RoomList v-bind:rooms="eventRooms"/>
    <form v-on:submit.prevent="add">
        <label>Local</label>
        <SelectInput 
            v-bind:options="roomsFiltered" 
            v-bind:option-text-attribute="'label'" 
            v-bind:option-value="'label'" 
            v-on:update:input="room = $event" 
            v-bind:default-selection="'Choississez un local'"/>
        <button type="submit">Ajouter</button>
    </form>
</template>