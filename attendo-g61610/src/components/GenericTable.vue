<script>
export default {
    props: {
        items: Array,
        columns: Array,
        pagination: {
            type: Boolean,
            default: false
        },
        initialSortBy: {
            type: String,
            default: ''
        },
        initialSortDirection: {
            type: String,
            default: 'asc'
        },
    },
    emits: ['row:click'],
    data() {
        return {
            sortBy: this.initialSortBy,
            sortDirection: this.initialSortDirection
        }
    },
    computed: {
        sortedElements() {
            if (!this.sortBy) return this.items;
            const modifier = this.sortDirection === 'asc' ? 1 : -1;
            // je sort une copie du vrai tableau comme ca on a toujours l'originel (utile dans le cadre ou on filtre aussi),
            // si l'attribut est un string alors je localeCompare sinon je fais du sorting de nombres
            return [...this.items].sort((a, b) => {
                const aVal = a[this.sortBy];
                const bVal = b[this.sortBy];

                if (typeof aVal === 'string' && typeof bVal === 'string') {
                    return aVal.localeCompare(bVal) * modifier;
                }

                if (aVal < bVal) return -1 * modifier;
                if (aVal > bVal) return 1 * modifier;
                return 0;
            });
        },
    },
    methods: {
        handleSort(column) {
            if (!column.sortable) return 
            if (this.sortBy === column.field) {
                this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc'
            } else {
                this.sortBy = column.field
                this.sortDirection = 'asc'
            }
        }
    }
}
</script>

<template>
    <div class="relative my-[10px] mx-auto border border-black max-w-1/2 z-10">
        <table class="w-full shadow-[0_2px_2px_rgba(0,0,0,0.75)]" style="border-spacing: unset;">
            <thead class="rounded-t-md">
                <th class="p-2.5 bg-black text-white text-start" v-for="column in columns" v-on:click="handleSort(column)">
                    {{ column.label }} 
                    <span v-if="sortBy === column.field">
                        <span v-if="sortDirection === 'asc'">↑</span>
                        <span v-if="sortDirection === 'desc'">↓</span>
                    </span>
                </th>
            </thead>
            <tbody>
                <tr class="border-b border-[rgba(0,0,0,0.25)] hover:bg-[#9F9FAA]" v-for="item in sortedElements" v-on:click="$emit('row:click', item)" :class="{'highlighted' : item.highlighted}">
                    <td class="p-2.5" v-for="column in columns">
                        <slot name="cellSlot" :item="item" :field="column.field">
                            <span>{{ item[column.field] }}</span>
                        </slot>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
@import "tailwindcss";
tr:hover {
    background-color: #9F9FAA;
}
.highlighted {
    background-color: pink;
}
</style>