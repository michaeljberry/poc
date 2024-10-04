<script setup>
import { ref } from 'vue'
defineProps({
  ext: {
    type: Boolean,
    default: false
  },
  src: {
    type: String,
    default: '#'
  },
  text: {
    type: String,
    required: true
  }
})
</script>

<template>
  <RouterLink v-if="!ext" :to="src" class="block rounded-lg px-3 py-2 text-sm font-semibold leading-6 text-gray-900">{{
    text
  }}</RouterLink>
  <a v-else :href="src" class="block rounded-lg px-3 py-2 text-sm font-semibold leading-6 text-gray-900">{{ text }}</a>
</template>
