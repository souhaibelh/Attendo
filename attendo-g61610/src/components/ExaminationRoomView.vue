<script>
import GenericTable from './GenericTable.vue';
import { getStudentsWithGroup } from '../service/listStudentPaeService'

export default {
    data() {
        return {
            students: []
        }
    },
    props: {
        sId: String,
        ue: String,
        eId: String,
        exId: String
    },
    components: {
        GenericTable
    },
    methods: {
        async fetchData() {
            this.students = (await getStudentsWithGroup(this.ue)).map(s => {
                const flattened = { ...s, group: s.pae?.[0]?.group };
                delete flattened.pae;
                console.log(flattened)
                return flattened;
            });
        }
    },
    mounted() {
        this.fetchData()
    }
}
</script>

<template>
    <GenericTable
        v-if="students.length > 0"
        v-bind:headers="['MATRICULE', 'GROUP', 'NOM', 'PRENOM']"
        v-bind:attributes="['student_id', 'group', 'lastname', 'firstname']"
        v-bind:items="students"/>
</template>