<script>
import {getAll} from '../service/listLocalService.js'
import {getEventRooms, add as addExamination} from '../service/listExaminationRoomService.js'
import {getEvents} from '../service/listEventService.js'
import {getId} from '../service/listSessionsUeService.js'
import SelectInput from '../components/SelectInput.vue'
import HorizontalFlexLayout from './HorizontalFlexLayout.vue'
import Room from './Room.vue'

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
            event: {},
        }
    },
    methods: {
        async fetchData() {
            this.eventRooms = await getEventRooms(this.eId)
            this.event = await getEvents(await getId(this.ue, this.sId))
            this.event = this.event.at(0)
            this.rooms = await getAll()
        },
        async add() {
            await addExamination(this.eId, this.room)
            this.eventRooms = await getEventRooms(this.eId)
        },
    },
    computed: {
        roomsFiltered() {
            const flattenedEventRooms = this.eventRooms.map(item => item.label)
            return this.rooms.filter(item => !flattenedEventRooms.includes(item.label))
        }
    },
    components: {
        SelectInput, HorizontalFlexLayout, Room
    },
    async mounted() {
        await this.fetchData()
    },
}
</script>

<template>
    <h1>Liste des locaux pour <span>{{ event.label }} - {{ ue }}</span></h1>
    <HorizontalFlexLayout v-bind:items="eventRooms"> 
        <template #flexChild="{ items }">
            <Room v-for="item in items" 
                v-bind:current-students="item.currentStudents"
                v-bind:default-supervisor="'Surveillant'"
                v-bind:max-capacity="item.capacity"
                v-bind:label="item.label">
                <template #link>
                    <RouterLink class="wrapper" :to="`/session/${sId}/ue/${ue}/event/${eId}/examination/${item.examination_room.at(0).id}/`"/>
                </template>
            </Room>
        </template>
    </HorizontalFlexLayout>
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