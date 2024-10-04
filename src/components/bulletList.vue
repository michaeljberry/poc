<script setup>
import { CheckCircleIcon } from '@heroicons/vue/20/solid'
import textElement from '@/components/textElement.vue'

const props = defineProps({
    content: {
        type: Object
    },
})

</script>

<template>
    <ul class="mt-8 max-w-xl space-y-8 text-gray-600">
        <li v-for="(item, key) in props.content.content" :key="key" class="flex gap-x-3">
            <CheckCircleIcon class="mt-1 h-5 w-5 flex-none text-orange-400" aria-hidden="true" />
            <template v-for="(element, key) in item.content[0].content" :key="key">
                <textElement :element="element"></textElement>
            </template>
        </li>
    </ul>
</template>