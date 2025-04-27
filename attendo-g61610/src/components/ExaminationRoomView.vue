<script>
import GenericTable from './GenericTable.vue';
import { getStudentsWithGroup } from '../service/listStudentPaeService'
import { has, insert, remove } from '../service/listExaminationService'

export default {
    data() {
        return {
            students: [],
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
            this.students = (await getStudentsWithGroup(this.ue, this.exId)).map(s => {
                const flattened = { ...s, group: s.pae?.[0]?.group, highlighted: s.examination?.length > 0 ? true : false};
                delete flattened.pae;
                delete flattened.examination
                return flattened;
            });
        },
        async handleStudentChange(item) {
            const hasStudent = await has(item.student_id, this.exId)
            if (!hasStudent) {
                await insert(item.student_id, this.exId)
                item.highlighted = true;
            } else {
                await remove(item.student_id, this.exId)
                item.highlighted = false;
            }
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
        v-bind:items="students"
        v-bind:initial-sort-by="'student_id'"
        v-bind:initial-sort-direction="'asc'"
        v-bind:pagination="true"
        v-bind:highlighted-row-condition="(item) => item.highlighted"
        v-bind:click-row-callback="(item) => handleStudentChange(item)"/>
</template>