<script setup>
import { ref, onBeforeMount } from 'vue'
import { useBlogPostStore } from '@/stores/blogPost'
// import { DotCmsClient } from '@dotcms/client'
// import {
//   ApolloClient,
//   HttpLink,
//   InMemoryCache,
// } from "@apollo/client/core"
// import { ALL_BLOGS_QUERY } from '@/queries'
import BlogTiles from '@/components/BlogTiles.vue'

const isLoading = ref(true)

let token = ref(null)
// let blogPosts = ref()
const store = useBlogPostStore()
// const blogPosts = store.blogPosts

const username = 'admin@dotcms.com'
const password = 'admin'
const blogPostUrl = 'https://demo.dotcms.com'

async function createJWT() {
  const endpoint = '/api/v1/authentication/api-token'
  const response = await fetch(`${blogPostUrl}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      user: username,
      password: password,
      expirationDays: 10
    })
  })
  const responseJson = await response.json();
  token.value = responseJson.entity.token
}

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

async function fetchBlogPosts() {
  const endpoint = '/api/content/render/false/query/+contentType:Blog%20+(conhost:48190c8c-42c4-46af-8d1a-0cd5db894797%20conhost:SYSTEM_HOST)%20+languageId:1%20+deleted:false%20+working:true%20+variant:default/orderby/modDate%20desc'

  try {
    isLoading.value = true
    const response = await fetch(`${blogPostUrl}${endpoint}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token.value}`,
        'Content-Type': 'application/json'
      },
    })
    const blogPostResponse = await response.json()
    store.blogPosts = blogPostResponse.contentlets
    // console.log(store.blogPosts)
    // console.log(blogPosts)
  } catch (e) {
    console.error(e)
  } finally {
    isLoading.value = false
  }
}

onBeforeMount(() => {
  createJWT().then(() => {
    fetchBlogPosts()
  })
})
// onMounted(() => {
//   fetchBlogPosts()
// })
</script>

<template>
  <main v-if="!isLoading">
    <div class="bg-white py-24 sm:py-32">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl text-center">
          <h2 class="text-5xl font-bold tracking-tight text-gray-900 sm:text-4xl uppercase">Travel Blog</h2>
          <p class="mt-2 text-lg leading-8 text-gray-600">Get inspired to experience the world. Our writers will give
            you their first-hand stories and recommendations that will inspire, excite you, and help you make the best
            desition s for planning your next adventure.
          </p>
        </div>
        <div class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          <!-- <BlogTiles v-for="post in blogPosts.contentlets" :key="post.identifier" :post="post" -->
          <BlogTiles v-for="post in store.blogPosts" :key="post.identifier" :post="post"
            class="flex flex-col items-start">
          </BlogTiles>
        </div>
      </div>
    </div>
  </main>
</template>