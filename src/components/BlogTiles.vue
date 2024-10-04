<script setup>
import { computed } from 'vue';

const props = defineProps({
  post: {
    type: Object
  },
})

const formatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: '2-digit',
});

const publishedDate = computed(() => {
  return formatter.format(new Date(props.post.publishDate))
})
</script>

<template>
  <div class="max-w-xl">
    <div class="mt-8 flex items-center gap-x-4 text-xs">
      <time :datetime="publishedDate" class="text-gray-500">
        {{ publishedDate }}
      </time>
    </div>
    <div class="group relative">
      <h3 class="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
        <RouterLink 
          :to="{ name: 'post', params: { slug: post.urlMap.replace('/blog/post/', ''), id: post.identifier } }">
          <span class="absolute inset-0" />
          {{ post.title }}
        </RouterLink>
      </h3>
      <p class="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{{ post.teaser }}</p>
    </div>
  </div>

</template>