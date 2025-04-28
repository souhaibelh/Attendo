<script>
export default {
    props: {
        headers: Array,
        items: Array,
        attributes: Array,
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
        highlightedRowCondition: {
            type: Function,
            default: () => false
        },
        clickRowCallback: {
            type: Function,
            default: () => null
        }
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
        toggleSort(index) {
            if (this.sortBy === this.attributes[index]) {
                this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc'
            } else {
                this.sortBy = this.attributes[index]
                this.sortDirection = 'asc'
            }
        }
    }
}
</script>

<template>
    <div class="table-container">
        <table>
            <thead>
                <th v-for="(header, index) in headers" v-on:click="toggleSort(index)">
                    {{ header }} 
                    <span v-if="sortBy === attributes[index]">
                        <span v-if="sortDirection === 'asc'">↑</span>
                        <span v-if="sortDirection === 'desc'">↓</span>
                    </span>
                </th>
            </thead>
            <tbody>
                <tr v-for="item in sortedElements" v-on:click="clickRowCallback(item)" :class="{'highlighted' : highlightedRowCondition(item)}">
                    <td v-for="attribute in attributes">
                        <slot name="cellSlot" :item="item" :attribute="attribute">
                            <span>{{ item[attribute] }}</span>
                        </slot>
                    </td>
                </tr>
            </tbody>
        </table>
        <div v-if="pagination" class="pagination">
            pagination
        </div>
    </div>
</template>

<style scoped>
@import "tailwindcss";
.table-container {
    position: relative;
    margin: 10px auto 10px auto;
    border: 1px solid black;
    max-width: 50%;
    z-index: 1;
}
.pagination {
    position: absolute;
    border: 1px solid red;
    width: 100%;
}
table {
    border-spacing: unset;
    box-shadow: 0px 2px 2px rgba(0,0,0,75%);
    width: 100%;
}
thead {
    border-radius: 4px 4px 0px 0px;
}
th {
    padding: 10px;
    background-color: black;
    color: white;
    text-align: start
}
td {
    padding: 10px;
}
tr {
    border-bottom: 1px solid rgba(0,0,0,25%);
}
tr:hover {
    background-color: #9F9FAA;
}
.highlighted {
    background-color: pink;
}
</style>