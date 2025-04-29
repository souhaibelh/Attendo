<script>
export default {
    props: {
        label: String,
        maxCapacity: Number,
        surveillant: String,
        defaultSupervisor: String,
        currentStudents: {
            type: Number,
            default: 0
        }
    },
    computed: {
        space() {
            const fillPercentage = (this.currentStudents * 100) / this.maxCapacity;

            if (fillPercentage >= 95) {
                return 'bg-red-500';
            } else if (fillPercentage >= 70) {
                return 'bg-yellow-400';
            } else {
                return '';
            }
        }
    }
}
</script>

<template>
    <div class="relative w-36 p-4 border border-black rounded-md hover:outline-2 hover:outline-black">
        <div :class="['absolute top-0 right-0 transform -translate-x-1.5 translate-y-1.5 px-4 py-1 border border-black rounded-full text-xs', space]">
            {{ currentStudents }} / {{ maxCapacity }}
        </div>
        <h1 class="mb-2 pb-2 border-b text-lg">{{ label }}</h1>
        <p class="text-sm font-semibold">{{ surveillant ? surveillant : defaultSupervisor }}</p>
        <slot name="link"></slot>
    </div>
</template>
