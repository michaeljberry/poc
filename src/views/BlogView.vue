<script setup>
import { ref, inject, onBeforeMount } from 'vue'
import { useBlogPostStore } from '@/stores/blogPost'
import { useAuthTokenStore } from '@/stores/authToken';
import BlogTiles from '@/components/BlogTiles.vue'

/*
 * Configurable variables
*/
// useLocal = true -> indicates that the hard-coded blog posts in the BlogPost store will be used instead of fetching from the remote site
const useLocal = false;
const blogPageTitle = 'Travel Blog'
const blogPageHighlight = `Get inspired to experience the world. Our writers will give
            you their first-hand stories and recommendations that will inspire, excite you, and help you make the best
            desition s for planning your next adventure.`

/*
 * End of configurable variables
*/

const store = useBlogPostStore()
const authStore = useAuthTokenStore();

const isLoading = ref(true)
const hostname = inject('hostname')

async function loadBlogPosts() {
  isLoading.value = true
  try {
    if(!useLocal) {
      await fetchBlogPosts()
    }

  } catch (e) {
    console.error(e)
  } finally {
    isLoading.value = false
  }
}

async function fetchBlogPosts() {
  const endpoint = '/api/content/render/false/query/+contentType:Blog%20+(conhost:48190c8c-42c4-46af-8d1a-0cd5db894797%20conhost:SYSTEM_HOST)%20+languageId:1%20+deleted:false%20+working:true%20+variant:default/orderby/modDate%20desc'
  try {
    const response = await fetch(`${hostname}${endpoint}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authStore.authToken}`,
        'Content-Type': 'application/json'
      },
    })
    const blogPostResponse = await response.json()
    store.blogPosts = blogPostResponse
  } catch (e) {
    console.error(e)
  }
}

onBeforeMount(() => {
  loadBlogPosts()
})
</script>

<template>
  <main>
    <div class="bg-white py-24 sm:py-32">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl text-center">
          <h2 class="text-5xl font-bold tracking-tight text-gray-900 sm:text-4xl uppercase">{{ blogPageTitle }}</h2>
          <p class="mt-2 text-lg leading-8 text-gray-600">{{ blogPageHighlight }}</p>
        </div>
        <div v-if="!isLoading" class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          <BlogTiles v-for="post in store.blogPosts.contentlets" :key="post.identifier" :post="post"
            class="flex flex-col items-start">
          </BlogTiles>
        </div>
      </div>
    </div>
  </main>
</template>