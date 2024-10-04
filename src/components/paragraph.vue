<script setup>
import { ref, onMounted, computed } from 'vue'
import { mappedClasses } from '@/mappedClasses';

const paragraph = ref()

const props = defineProps({
    content: {
        type: Object
    },
})

const cssClasses = (element) => {
    if(!element?.marks?.length) return
    return element.marks.map(mark => {
        if(mark.type != 'link') return mappedClasses[mark.type]
    })
}

const isThisALink = (element) => {
    if(!element?.marks?.length) return false
    const elementsWithMarks = element.marks.filter(element => {
        return element.type != 'link'
    })
    if (elementsWithMarks.length) return false
    console.log(element)
    return true
}

async function rehydrateElement() {
    paragraph.value = props.content.content
}

onMounted(async () => {
    await rehydrateElement()
})
</script>
<template>
    <p class="mt-10 max-w-2xl">
        <template v-for="(element, key) in props.content.content" :key="key">
            <span v-if="!isThisALink(element)" :class="[cssClasses(element)]">
                {{ element.text }}
            </span>
            <a 
                v-if="isThisALink(element)"
                :href="element.marks[0].attrs.href"
                :target="element.marks[0].attrs.target"
                :rel="element.marks[0].attrs.rel"
                :class="'text-orange-400' + [cssClasses(element.marks[0].attrs.class)]"
            >
                {{ element.text }}
            </a>
        </template>
    </p>
</template>