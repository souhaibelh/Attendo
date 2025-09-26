<script>
export default {
    props: {
        options: Array,
        optionTextAttribute: String,
        optionValue: String,
        defaultSelection: String
    },
    emits: ['update:input'],
}
</script>

<template>
    <select ref="select" v-on:input="$emit('update:input', $event.target.value)">
        <option v-if="defaultSelection" selected>{{ defaultSelection }}</option>
        <option v-for="option in options" v-bind:value="option[optionValue]">{{ option[optionTextAttribute] }}</option>
    </select>
</template>