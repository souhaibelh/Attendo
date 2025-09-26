<script>
export default {
    props: {
        items: Array
    }
}
</script>

<template>
    <div class="flex gap-[10px] flex-wrap">
        <slot name="flexChild" :items="items"></slot>
    </div>
</template>