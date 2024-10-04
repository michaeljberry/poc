<script setup>
import textElement from '@/components/textElement.vue'

const props = defineProps({
    content: {
        type: Object
    },
})

</script>
<template>
    <p class="mt-10 max-w-2xl">
        <template v-for="(element, key) in props.content.content" :key="key">
            <textElement :element="element"></textElement>
        </template>
    </p>
</template>