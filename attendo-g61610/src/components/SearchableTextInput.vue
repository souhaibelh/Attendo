<script>
import TextInput from './TextInput.vue'

export default {
    props: {
        value: String,
        items: Array,
        placeholder: String,
        label: String,
        filterFunction: {
            type: Function,
            default: () => null
        }
    },
    components: {
        TextInput
    },
    data() {
        return {
            displaySearch: false
        }
    },
    emits: ['data:submit', 'update:input'],
    methods: {
        updateInput(value) {
            this.$emit('update:input', value)

            if (value.length === 0) {
                this.displaySearch = false
            } else {
                this.displaySearch = true
            }
        },
        handleClickOutside() {
            this.displaySearch = false
        }
    },
    computed: {
        filteredItems() {
            return this.filterFunction(this.items)
        }
    }
}
</script>

<template>
    <div class="searchable-container" v-click-outside="handleClickOutside">
        <label>{{ label }}</label>
        <div class="input-container">
            <input 
                type="text"
                v-bind:value="value"
                v-bind:placeholder="placeholder"
                v-on:input="updateInput($event.target.value)">
            <ul v-if="displaySearch" class="results">
                <slot v-for="item in filteredItems" name="resultSearch" :item="item"></slot>
            </ul>
        </div>
    </div>
</template>

<style scoped>
.searchable-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: max-content;
    gap: 10px;
    margin: 10px;
}

.input-container {
    position: relative;
    width: 200px;
}

input {
    border: 1px solid black;
    padding: 4px;
}

input:focus {
    outline: unset;
}

.results {
    position: absolute;
    width: 100%;
    margin-top: 4px;
    border: 1px solid black;
    border-radius: 6px;
    box-shadow: 0px 1px 2px rgba(0,0,0,75%);
    z-index: 20;
}

.searchable-container > input {
    width: 100%;
}
</style>
