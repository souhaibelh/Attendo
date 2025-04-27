<script>
import {getAll} from '../service/listLocalService.js'
import {getEventRooms, add as addExamination} from '../service/listExaminationRoomService.js'
import {getEvents} from '../service/listEventService.js'
import {getId} from '../service/listSessionsUeService.js'
import SelectInput from '../components/SelectInput.vue'
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
            room: null,
            event: {}
        }
    },
    async mounted() {
        this.fetchData()
        this.event = await getEvents(await getId(this.ue, this.sId))
        this.event = this.event.at(0)
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
    <h1>Liste des locaux pour <span>{{ event.label }} - {{ ue }}</span></h1>
    <RoomList v-bind:rooms="eventRooms">
        <template v-slot="{ room }">
            <RouterLink class="wrapper" :to="`examination/${room.examination_room.at(0).id}/`"/>
        </template>
    </RoomList>
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

<style scoped>
h1 > span {
    font-weight: 600;
}

.wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
}
</style>