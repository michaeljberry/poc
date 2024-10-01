<template>
  <RouterLink v-if="!ext" :to="src" class="text-sm font-semibold leading-6 text-gray-900">{{
    text
  }}</RouterLink>
  <a v-else :href="src" class="text-sm font-semibold leading-6 text-gray-900">{{ text }}</a>
</template>

<script setup>
import { ref } from 'vue'
defineProps({
  ext: {
    type: Boolean,
    required: true,
    default: false
  },
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
