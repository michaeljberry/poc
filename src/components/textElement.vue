<script setup>
import { onMounted } from 'vue';
import { cssClasses } from '@/classes'

const props = defineProps({
    element: {
        type: Object
    },
})

onMounted(() => {
    // console.log(props.element)
})
const isThisALink = (element) => {
    console.log(element)
    if(!element?.marks?.length) return false
    const elementsWithMarks = element.marks.filter(element => {
        return element.type != 'link'
    })
    if (elementsWithMarks.length) return false
    return true
}
</script>
<template>
    <span v-if="!isThisALink(props.element)" :class="[cssClasses(props.element)]">
        {{ props.element.text }}
    </span>
    <a v-if="isThisALink(props.element)" :href="props.element.marks[0].attrs.href" :target="props.element.marks[0].attrs.target"
        :rel="props.element.marks[0].attrs.rel" :class="'text-orange-400' + [cssClasses(props.element.marks[0].attrs.class)]">
        {{ props.element.text }}
    </a>
</template>
