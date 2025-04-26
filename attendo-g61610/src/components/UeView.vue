<script>
import { getId } from '../service/listSessionsUeService'
import { get } from '../service/listSessionsService'
import { add, getEvents } from '../service/listEventService'
import TextInput from '../components/TextInput.vue'
import EventList from '../components/EventList.vue'

export default {
    data() {
        return {
            label: '',
            session_compo: null,
            events: [],
            session: {}
        }
    },
    props: {
        sId: String,
        ue: String,
    },
    components: {
        TextInput, EventList
    },
    methods: {
        async fetchData() {
            const id = await getId(this.ue, this.sId)
            this.session_compo = id
            const data = await getEvents(this.session_compo)
            this.events = data
            const session = await get(this.sId)
            this.session = session
        },
        async fetchEvents() {
            const data = await getEvents(this.session_compo)
            this.events = data
        },
        async add() {
            await add(this.session_compo, this.label)
            this.fetchEvents()
        }
    },
    mounted() {
        this.fetchData()
    }
}
</script>

<template>
    <h1>Liste des epreuves de {{ ue }} (session: {{ session.label }})</h1>
    <EventList v-bind:events="events" v-bind:attribute="'label'"/>
    <form v-on:submit.prevent="add()">
        <label>Intitule:</label>
        <TextInput v-bind:placeholder="'bilan, projet, examen...'" v-bind:value="label" v-on:update:input="label = $event"/>
        <button type="submit">CREER</button>
    </form>
</template>