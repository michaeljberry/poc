<script setup>
import { ref, inject, onMounted } from 'vue';
const props = defineProps({
    content: {
        type: Object
    },
})
const hostname = inject('hostname')

const src = ref()

function createSrc() {
    src.value = `${hostname}${props.content.attrs.src}`
}

onMounted(() => {
    createSrc()
})

</script>

<template>
    <figure class="mt-16">
        <img class="aspect-video rounded-xl bg-gray-50 object-cover"
          :src="src"
          alt="" />
      </figure>
</template>