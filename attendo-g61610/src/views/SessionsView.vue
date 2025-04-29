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
    Sessions
    <GenericTable
        v-if="sessions.length > 0" 
        v-bind:headers="['Sessions']" 
        v-bind:attributes="['label']" 
        v-bind:routes="['session']" 
        v-bind:linkedAttributes="['id']" 
        v-bind:items="sessions">
        <template #cellSlot="{ item }">
            <RouterLink class="text-blue-700 hover:underline" :to="`session/${item['id']}`">{{ item['label'] }}</RouterLink>
        </template>
    </GenericTable>
    <span v-else>Aucune session</span>
    <form v-on:submit.prevent="add">
        <label>Nouvelle session</label>
        <TextInput v-bind:placeholder="'juin'" v-bind:value="sessionLabel" v-on:update:input="sessionLabel = $event"/>
        <button type="submit">Ajouter</button>
    </form>
</template>