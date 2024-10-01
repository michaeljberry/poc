<template>
  <a
    :href="src"
    class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
    >{{ text }}</a
  >
</template>
<script setup>
defineProps({
  src: {
    type: String,
    required: true,
    default: '#'
  },
  text: {
    type: String,
    required: true
  }
})
</script>
