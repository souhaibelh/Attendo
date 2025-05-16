<script>
import GenericTable from './GenericTable.vue';
import SearchableTextInput from './SearchableTextInput.vue';
import { getStudentsWithGroup } from '../service/listStudentPaeService'
import { has, insert, remove, update, get } from '../service/listExaminationService'
import { getAll } from '../service/listTeacherService'
import Breadcrumb from './Breadcrumb.vue';

export default {
    data() {
        return {
            students: [],
            surveillant: '',
            teachers: [],
            teacher: '',
            currentTeacher: null,
            room: null,
            filterKey: '',
            errors: []
        }
    },
    props: {
        sId: String,
        ue: String,
        eId: String,
        exId: String
    },
    components: {
        GenericTable, SearchableTextInput, Breadcrumb
    },
    methods: {
        clearErrors() {
            this.errors.length = 0
        },
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
                try {
                    await insert(item.student_id, this.exId)
                    item.highlighted = true;
                    this.clearErrors()
                } catch (error) {
                    this.errors.push(error)
                }
            } else {
                try {
                    await remove(item.student_id, this.exId)
                    item.highlighted = false;
                    this.clearErrors()
                } catch (error) {
                    this.errors.push(error)
                }
            }
        },
        async submitSurveillant() {
            try {
                await update(this.teacher.toUpperCase(), this.exId)
                this.currentTeacher = this.teacher.toUpperCase()
                this.clearErrors()
            } catch (error) {
                this.errors.push(error)
            }
        },
        selectSupervisor(supervisor, callback) {
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
    <Breadcrumb class="m-[12px]"/>
    <h1 class="m-[12px]">
        Prise de presence du local 
        <span class="font-semibold" v-if="room">{{ room }}</span> 
        <span v-if="currentTeacher">
            par 
            <span class="font-semibold">{{ currentTeacher }}</span>
        </span>
    </h1>
    <div class="m-[12px] flex justify-center items-center w-max gap-[4px]">
        <label for="teacher">Surveillant:</label>
        <SearchableTextInput
            v-bind:input-id="'teacher'"
            v-bind:items="teachers" 
            v-bind:value="teacher" 
            v-on:update:input="teacher = $event" 
            v-bind:placeholder="'Choississez un surveillant'"
            v-bind:filter-function="(items) => {
                return items.filter((item) => {
                    if (item['acro'] && item['acro'].toLowerCase().includes(teacher.toLowerCase())) {
                        return true;
                    }
                    return false;
                });
            }">
            <template #resultSearch="{ item, setDisplaySearch }">
                <li tabindex="0" v-on:click="selectSupervisor(item.acro, () => setDisplaySearch(false))" class="p-1 cursor-pointer bg-white max-w-full hover:bg-gray-200">{{ item.acro }}: {{ item.names }}</li>
            </template>
        </SearchableTextInput>
        <button class="border-[2px] border-gray-300 p-[4px] hover:border-black cursor-pointer" v-on:click="submitSurveillant">Definir le surveillant</button>
    </div>
    <ol class="m-[12px] text-red-500" v-if="errors.length > 0">
        <li v-for="error in errors">
            {{ error }}
        </li>
    </ol>
    <GenericTable
        v-if="students.length > 0"
        v-bind:columns="[
            {label: 'MATRICULE', field: 'student_id', sortable: true},
            {label: 'GROUP', field: 'group', sortable: true},
            {label: 'NOM', field: 'lastname', sortable: true},
            {label: 'PRENOM', field: 'firstname', sortable: true}
        ]"
        v-bind:items="students"
        v-bind:initial-sort-by="'student_id'"
        v-bind:initial-sort-direction="'asc'"
        v-bind:pagination="true"
        v-on:row:click="handleStudentChange"/>
    <span class="m-[12px]" v-else>QUERYING DATABASE</span>    
</template>