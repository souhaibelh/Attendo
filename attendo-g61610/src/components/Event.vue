<script>
export default {
    props: {
        label: String
    },
}
</script>

<template>
    <div class="relative w-32 h-36 bg-gray-300 shadow-md rounded-lg hover:outline-2 hover:outline-black box-border">
        <p class="text-center py-1">{{ label }}</p>
        <slot name="link"></slot>
    </div>
</template>