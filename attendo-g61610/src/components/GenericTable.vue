<script>
export default {
    data() {
        return {
            baseOrigin: window.location.origin
        }
    },
    props: {
        headers: Array,
        items: Array,
        attributes: Array,
        routes: Array,
        linkedAttributes: Array
    }
}
</script>

<template>
    <table>
        <thead>
            <th v-for="header in headers">{{ header }}</th>
        </thead>
        <tbody>
            <tr v-for="item in items">
                <td v-for="(attribute, index) in attributes">
                    <RouterLink class="text-blue-700 hover:underline" v-if="routes[index]" :to="routes[index] + '/' + item[linkedAttributes[index]] + '/'">{{ item[attribute] }}</RouterLink>
                    <span v-else>{{ item[attribute] }}</span>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<style scoped>
@import "tailwindcss";
table {
    margin: 10px auto 10px auto;
    border-spacing: unset;
    min-width: 75%;
    box-shadow: 0px 2px 2px rgba(0,0,0,75%);
}
th {
    padding: 10px;
    background-color: black;
    color: white;
    border-radius: 4px 4px 0px 0px;
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
</style>