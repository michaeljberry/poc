<script setup>
import { CheckCircleIcon, InformationCircleIcon } from '@heroicons/vue/20/solid'
import { ref, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router';
import { useBlogPostStore } from '@/stores/blogPost'
import paragraph from '@/components/paragraph.vue'
import dotImage from '@/components/dotImage.vue'
import heading from '@/components/heading.vue'
import bulletList from '@/components/bulletList.vue'

const route = useRoute();
const store = useBlogPostStore()
const blogPosts = store.blogPosts.contentlets

const post = ref()

defineProps({
  id: {
    type: String
  }
})

function getComponent(section) {
  if(section.type == 'paragraph') return paragraph
  if(section.type == 'dotImage') return dotImage
  if(section.type == 'heading') return heading
  if(section.type == 'bulletList') return bulletList
}

async function getPost() {
  const posts = blogPosts
  const identifier = route.params.id
  post.value = posts.filter(post => {
    return post.identifier == identifier
  })[0]
}

onBeforeMount(() => {
  getPost()
});
</script>

<template>
  <div class="bg-white px-6 py-32 lg:px-8">
    <div class="mx-auto max-w-3xl text-base leading-7 text-gray-700">
      <p class="text-base font-semibold leading-7 text-orange-400">Introducing</p>
      <h1 class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{{ post.pageTitle }}</h1>
      <section  >
        <component
          v-for="(section, key) in post.blogContent.content"
          :key="key"
          :is="getComponent(section)"
          :content=section
        >
        </component>
      </section>
    </div>
  </div>
</template>