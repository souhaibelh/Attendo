<script>
import GenericTable from '../components/GenericTable.vue'
import TextInput from '../components/TextInput.vue'
import { getAll, add } from '../service/listSessionsService'

export default {
    components: {GenericTable, TextInput},
    data() {
        return {
            sessions: [],
            sessionLabel: ''
        }
    },
    methods: {
        async fetchData() {
            const data = await getAll()
            this.sessions = data
        },
        async add() {
            await add(this.sessionLabel)
            this.fetchData()
        }
    },
    mounted() {
        this.fetchData()
    }
}
</script>

<template>
    <h1 class="m-[12px]">Sessions</h1>
    <GenericTable
        v-if="sessions.length > 0" 
        v-bind:columns="[
            {label: 'Sessions', field: 'label', sortable: true}
        ]"
        v-bind:initial-sort-by="'label'"
        v-bind:initial-sort-direction="'asc'"
        v-bind:items="sessions">
        <template #cellSlot="{ item }">
            <RouterLink class="text-blue-700 hover:underline" :to="`session/${item['id']}`">{{ item['label'] }}</RouterLink>
        </template>
    </GenericTable>
    <span class="m-[12px]" v-else>Aucune session</span>
    <form class="flex m-[12px] justify-center items-center w-max gap-[4px]" v-on:submit.prevent="add">
        <label for="session">Nouvelle session</label>
        <TextInput id="session" class="border-[2px] border-gray-300 p-[4px]" v-bind:placeholder="'juin'" v-bind:value="sessionLabel" v-on:update:input="sessionLabel = $event"/>
        <button class="border-[2px] border-gray-300 p-[4px] hover:border-black cursor-pointer" type="submit">Ajouter</button>
    </form>
</template>