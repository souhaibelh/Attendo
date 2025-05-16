<script>
import { getAll } from '../service/listUeService'
import { getUeInSession, addUeToSession } from '../service/listSessionsUeService'
import { get as getSession } from '../service/listSessionsService'
import GenericTable from '../components/GenericTable.vue'
import SelectInput from '../components/SelectInput.vue'

export default {
    data() {
        return {
            session: null,
            sessionUe: [],
            ues: [],
            ue: null
        }
    },
    components: { GenericTable, SelectInput },
    props: {
        id: String
    },
    methods: {
        async fetchData() {
            getUeInSession(this.id).then((data) => {
                this.sessionUe = data
            })
        },
        async add() {
            await addUeToSession(this.ue, this.session.id)
            this.fetchData()
        }
    },
    computed: {
        uesFiltered() {
            const flattened = this.sessionUe.map(item => item.ue)
            return this.ues.filter(item => !flattened.includes(item.ue))
        }
    },
    mounted() {
        getSession(this.id).then((data) => {
            this.session = data
        })

        getAll().then((data) => {
            this.ues = data
        })

        this.fetchData()
    }
}
</script>

<template>
    <h1 class="m-[12px]" v-if="session">
        Session 
        <span class="font-semibold">{{ session.label }}</span>
    </h1>
    <GenericTable
        v-if="sessionUe.length > 0"
        v-bind:columns="[
            {label: 'UE', field: 'ue', sortable: true}
        ]"
        v-bind:initial-sort-by="'ue'"
        v-bind:initial-sort-direction="'asc'"
        v-bind:items="sessionUe">
        <template #cellSlot="{ item }">
            <RouterLink class="text-blue-700 hover:underline" :to="`/session/${id}/ue/${item['ue']}/`">{{ item['ue'] }}</RouterLink>
        </template>
    </GenericTable>
    <span class="m-[12px]" v-else>Pas de ue dans cette session</span>
    <form class="flex m-[12px] justify-center items-center w-max gap-[4px]" v-on:submit.prevent="add">
        <label for="ue">Ajouter UE</label>
        <SelectInput
            id="ue" 
            class="border-[2px] border-gray-300 p-[4px]"
            v-bind:options="uesFiltered" 
            v-bind:option-text-attribute="'ue'" 
            v-bind:option-value="'ue'" 
            v-on:update:input="ue = $event" 
            v-bind:default-selection="'Choississez une UE'"/>
        <button class="border-[2px] border-gray-300 p-[4px] hover:border-black cursor-pointer" type="submit">Ajouter</button>
    </form>
</template>