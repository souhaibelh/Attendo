<script>
import { getId } from '../service/listSessionsUeService'
import { get } from '../service/listSessionsService'
import { add, getEvents } from '../service/listEventService'
import TextInput from '../components/TextInput.vue'
import HorizontalFlexLayout from './HorizontalFlexLayout.vue'
import Event from './Event.vue'

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
        TextInput, HorizontalFlexLayout, Event
    },
    methods: {
        async fetchData() {
            const id = await getId(this.ue, this.sId)
            this.session_compo = id
            this.fetchEvents()
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
    <HorizontalFlexLayout v-bind:items="events">
        <template #flexChild="{ items }">
            <Event v-for="item in items" v-bind:label="item.label">
                <template #link>
                    <RouterLink class="wrapper" :to="`/session/${sId}/ue/${ue}/event/${item.id}`"/>
                </template>
            </Event>
        </template>
    </HorizontalFlexLayout>
    <form v-on:submit.prevent="add()">
        <label>Intitule:</label>
        <TextInput v-bind:placeholder="'bilan, projet, examen...'" v-bind:value="label" v-on:update:input="label = $event"/>
        <button type="submit">CREER</button>
    </form>
</template>

<style scoped>
.wrapper {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
}
</style>