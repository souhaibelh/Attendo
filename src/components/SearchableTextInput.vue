<script>
export default {
    props: {
        value: String,
        items: Array,
        placeholder: String,
        inputId: String,
        filterFunction: {
            type: Function,
            default: (items) => items
        },
    },
    data() {
        return {
            displaySearch: false
        }
    },
    emits: ['update:input'],
    methods: {
        updateInput(value) {
            this.$emit('update:input', value)
            this.setDisplaySearch(value?.length > 0)
        },
        toggleDisplaySearch() {
            this.setDisplaySearch(this.value?.length > 0)
        },
        // fonction qui s'execute lorseque on click ailleurs, utilisation de la directive click-outside
        handleClickOutside() {
            this.displaySearch = false
        },
        // fonction pour changer la visibilite des resultats de la recherche
        setDisplaySearch(state) {
            this.displaySearch = state
        }
    },
    computed: {
        // je laisse le parent choisir comment filtrer les resultats, dans le cas ou il faut etre plus complexe que un simple contains
        filteredItems() {
            return this.filterFunction(this.items)
        }
    }
}
</script>

<template>
    <div class="flex justify-center items-center w-max gap-[10px]" v-click-outside="handleClickOutside">
        <div class="relative w-[200px]">
            <input 
                v-bind:id="inputId"
                class="border-[2px] border-gray-300 p-[4px] w-full"
                type="text"
                v-bind:value="value"
                v-bind:placeholder="placeholder"
                v-on:input="updateInput($event.target.value)"
                v-on:click="toggleDisplaySearch">
            <ul v-if="displaySearch" class="absolute w-full mt-1 border border-black rounded-md shadow-sm z-20">
                <slot v-for="item in filteredItems" name="resultSearch" :item="item" :setDisplaySearch="setDisplaySearch"></slot>
            </ul>
        </div>
    </div>
</template>