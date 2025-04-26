<script>
export default {
    props: {
        placeholder: String,
        value: String
    },
    emits: ['update:input']
}
</script>

<template>
    <input 
        type="text" 
        v-bind:value="value"
        v-bind:placeholder="placeholder"
        v-on:input="$emit('update:input', $event.target.value)">
</template>