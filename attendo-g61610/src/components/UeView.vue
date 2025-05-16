<script>
import { getId } from '../service/listSessionsUeService'
import { get } from '../service/listSessionsService'
import { add, getEvents } from '../service/listEventService'
import TextInput from '../components/TextInput.vue'
import HorizontalFlexLayout from './HorizontalFlexLayout.vue'
import Event from './Event.vue'
import Breadcrumb from './Breadcrumb.vue'

export default {
    data() {
        return {
            label: '',
            session_compo: null,
            events: [],
            session: {},
        }
    },
    props: {
        sId: String,
        ue: String,
    },
    components: {
        TextInput, HorizontalFlexLayout, Event, Breadcrumb
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
    <Breadcrumb class="m-[12px]"/>
    <h1 class="m-[12px]">
        Liste des epreuves de 
        <span class="font-semibold">{{ ue }}</span>
        (
            session: 
            <span class="font-semibold">{{ session.label }}</span>
        )
    </h1>
    <HorizontalFlexLayout class="m-[12px]" v-bind:items="events">
        <template #flexChild="{ items }">
            <Event v-for="item in items" v-bind:label="item.label">
                <template #link>
                    <RouterLink class="absolute top-0 w-full h-full" :to="`/session/${sId}/ue/${ue}/event/${item.id}`"/>
                </template>
            </Event>
        </template>
    </HorizontalFlexLayout>
    <form class="flex m-[12px] justify-center items-center w-max gap-[4px]" v-on:submit.prevent="add()">
        <label for="intitule">Intitule:</label>
        <TextInput id="intitule" class="border-[2px] border-gray-300 p-[4px]" v-bind:placeholder="'bilan, projet, examen...'" v-bind:value="label" v-on:update:input="label = $event"/>
        <button class="border-[2px] border-gray-300 p-[4px] hover:border-black cursor-pointer" type="submit">CREER</button>
    </form>
</template>