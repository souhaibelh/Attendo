<script>
import GenericTable from './GenericTable.vue';
import SearchableTextInput from './SearchableTextInput.vue';
import { getStudentsWithGroup } from '../service/listStudentPaeService'
import { has, insert, remove, update, get } from '../service/listExaminationService'
import { getAll } from '../service/listTeacherService'

export default {
    data() {
        return {
            students: [],
            surveillant: '',
            teachers: [],
            teacher: '',
            currentTeacher: null,
            room: null,
        }
    },
    props: {
        sId: String,
        ue: String,
        eId: String,
        exId: String
    },
    components: {
        GenericTable, SearchableTextInput
    },
    methods: {
        async fetchData() {
            this.teachers = await getAll();

            const examination_room = await get(this.exId)
            this.room = examination_room.at(0).room
            this.currentTeacher = examination_room.at(0).supervisor

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
        },
        async submitSurveillant() {
            await update(this.teacher, this.exId)
            this.currentTeacher = this.teacher
        },
        selectSupervisor(supervisor, callback) {
            console.log(supervisor)
            this.teacher = supervisor
            callback()
        }
    },
    mounted() {
        this.fetchData()
    }
}
</script>

<template>
    <h1>
        Prise de presence du local <span v-if="room">asd</span> <span v-if="currentTeacher">par {{ currentTeacher }}</span>
    </h1>
    <div class="container">
        <label for="teacher">Surveillant</label>
        <SearchableTextInput v-bind:items="teachers" v-bind:value="teacher" v-on:update:input="teacher = $event" v-bind:placeholder="'Choississez un surveillant'"
            v-bind:filter-function="(items) => {
                return items.filter((item) => {
                    if (item['acro'] && item['acro'].toLowerCase().includes(teacher.toLowerCase())) {
                        return true;
                    }
                    return false;
                });
            }">
            <template #resultSearch="{ item, setDisplaySearch }">
                <li tabindex="0" v-on:click="selectSupervisor(item.acro, () => setDisplaySearch(false))" class="result">{{ item.acro }}: {{ item.names }}</li>
            </template>
        </SearchableTextInput>
        <button v-on:click="submitSurveillant">Definir le surveillant</button>
    </div>
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

<style scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: max-content;
}

.result {
    padding: 4px;
    cursor: pointer;
    background-color: white;
    max-width: 100%;
}

.result:hover {
    background-color: lightgray;
}

button {
    border: 1px solid black;
    padding: 4px;
    cursor: pointer;
}

button:hover {
    background-color: lightgray;
}
</style>