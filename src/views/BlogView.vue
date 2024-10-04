<script setup>
import { ref, inject, onBeforeMount } from 'vue'
import { useBlogPostStore } from '@/stores/blogPost'
import { useAuthTokenStore } from '@/stores/authToken';
// import { DotCmsClient } from '@dotcms/client'
// import {
//   ApolloClient,
//   HttpLink,
//   InMemoryCache,
// } from "@apollo/client/core"
// import { ALL_BLOGS_QUERY } from '@/queries'
import BlogTiles from '@/components/BlogTiles.vue'

const isLoading = ref(true)

const store = useBlogPostStore()
const authStore = useAuthTokenStore();
const useLocal = false;

const hostname = inject('hostname')
// const blogPostUrl = 'https://demo.dotcms.com'

// async function fetchBlogPosts() {
//   const httpLink = await new HttpLink({
//   uri: 'https://demo.dotcms.com/api/v1/graphql',
//   headers: {
//     // authorization: `Bearer ${token.value}`,
//     // 'Content-Type': 'application/graphql',
//     // 'DOT_API_CORS_DEFAULT_ACCESS_CONTROL_ALLOW_ORIGIN': '*',
//     // 'DOT_API_CORS_DEFAULT_ACCESS_CONTROL_ALLOW_HEADERS': '*',
//     // 'DOT_API_CORS_DEFAULT_ACCESS_CONTROL_ALLOW_METHODS': 'GET,PUT,POST,DELETE,HEAD,OPTIONS,PATCH',
//     // 'DOT_API_CORS_DEFAULT_ACCESS_CONTROL_ALLOW_CREDENTIALS': 'true',
//     // 'DOT_API_CORS_DEFAULT_ACCESS_CONTROL_EXPOSE_HEADERS': '*',
//     // 'Access-Control-Allow-Origin': '*',
//     // 'Access-Control-Allow-Headers': '*',
//     // 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,HEAD,OPTIONS,PATCH',
//     // 'Access-Control-Allow-Credentials': 'true',
//     // 'Access-Control-Expose-Headers': '*'
//     // 'DOT_API_CORS_CONTENTRESOURCE_ACCESS_CONTROL_ALLOW_CREDENTIALS': 'false',
//     // 'DOT_API_CORS_CONTENTRESOURCE_ACCESS_CONTROL_ALLOW_METHODS': 'PUT',
//     // 'DOT_API_CORS_CONTENTRESOURCE_ACCESS_CONTROL_ALLOW_ORIGIN': 'localhost',
//     // 'DOT_API_CORS_CONTENTRESOURCE_ACCESS_CONTROL_ALLOW_HEADERS': 'Authorization,Accept,Cookies,Content-Type,Content-Length',
//   },
//   // fetchOptions: {
//   //   mode: 'no-cors'
//   // }
//   })

// const cache = await new InMemoryCache()

// const apolloClient = await new ApolloClient({
//   link: httpLink,
//   // fetchOptions:{
//   //   credentials: 'include'
//   // },
//   cache,
// })

// await apolloClient.query({
//   query: ALL_BLOGS_QUERY,
//   })
//   .then(res => {
//     console.log(res);
//   })
// }

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
          <h2 class="text-5xl font-bold tracking-tight text-gray-900 sm:text-4xl uppercase">Travel Blog</h2>
          <p class="mt-2 text-lg leading-8 text-gray-600">Get inspired to experience the world. Our writers will give
            you their first-hand stories and recommendations that will inspire, excite you, and help you make the best
            desition s for planning your next adventure.
          </p>
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