<script setup>
const props = defineProps({
    content: {
        type: Object
    },
})

const mappedHeadingSizes = {
    1: 'text-3xl',
    2: 'text-2xl',
    3: 'text-xl',
    4: 'text-lg',
    5: 'text-base'
}

function createTextSize() {
    return mappedHeadingSizes[props.content.attrs.level]
}

function createTag() {
    return `h${props.content.attrs.level}`
}
</script>

<template>
    <component :is="createTag()" :class="'mt-16 font-bold tracking-tight text-gray-900 ' + createTextSize()">
        {{ content.content[0].text }}
    </component> 
</template>