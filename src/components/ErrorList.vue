<script>
export default {
    props: {
        errors: Array,
    },
}
</script>

<template>
    <ol class="text-red-500" v-if="errors.length > 0">
        <li v-for="error in errors">
            {{ error }}
        </li>
    </ol>
</template>