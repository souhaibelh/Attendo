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
    <GenericTable v-bind:headers="['Sessions']" v-bind:attributes="['label']" v-bind:items="sessions"/>
    <form v-on:submit.prevent="add">
        <label>Nouvelle session</label>
        <TextInput v-bind:placeholder="'juin'" v-bind:value="sessionLabel" v-on:update:input="sessionLabel = $event"/>
        <button type="submit">Ajouter</button>
    </form>
</template>