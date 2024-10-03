<script setup>
import { ref, onBeforeMount, onMounted } from 'vue'
import { useBlogPostStore } from '@/stores/blogPost'
import { DotCmsClient } from '@dotcms/client'
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
} from "@apollo/client/core"
import { ALL_BLOGS_QUERY } from '@/queries'

const isLoading = ref(true)

let token = ref(null)
let blogPosts = ref()

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
  console.log(response)
  token.value = await response.json()
  console.log(token)
}

async function fetchBlogPosts() {
  const httpLink = await new HttpLink({
  uri: 'https://demo.dotcms.com/api/v1/graphql',
  headers: {
    // authorization: `Bearer ${token.value}`,
    // 'Content-Type': 'application/graphql',
    // 'DOT_API_CORS_DEFAULT_ACCESS_CONTROL_ALLOW_ORIGIN': '*',
    // 'DOT_API_CORS_DEFAULT_ACCESS_CONTROL_ALLOW_HEADERS': '*',
    // 'DOT_API_CORS_DEFAULT_ACCESS_CONTROL_ALLOW_METHODS': 'GET,PUT,POST,DELETE,HEAD,OPTIONS,PATCH',
    // 'DOT_API_CORS_DEFAULT_ACCESS_CONTROL_ALLOW_CREDENTIALS': 'true',
    // 'DOT_API_CORS_DEFAULT_ACCESS_CONTROL_EXPOSE_HEADERS': '*',
    'Access-Control-Allow-Origin': '*',
    // 'Access-Control-Allow-Headers': '*',
    // 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,HEAD,OPTIONS,PATCH',
    // 'Access-Control-Allow-Credentials': 'true',
    // 'Access-Control-Expose-Headers': '*'
  },
  // fetchOptions: {
  //   mode: 'no-cors'
  // }
  })

  const cache = await new InMemoryCache()

const apolloClient = await new ApolloClient({
  link: httpLink,
  // fetchOptions:{
  //   credentials: 'include'
  // },
  cache,
})

await apolloClient.query({
  query: ALL_BLOGS_QUERY,
  })
  .then(res => {
    console.log(res);
  })
}

// async function fetchBlogPosts() {
//   const endpoint = '/api/content/query/live/10'
//   //   const endpoint = '/api/v1/graphql'
//   const body = {
//     query: '{blogCollection(limit: 10) {}}'
//   }

//   try {
//     isLoading.value = true
//     const response = await fetch(`${blogPostUrl}${endpoint}`, {
//       method: 'GET',
//       //   method: 'POST',
//       headers: {
//         Authorization: `Bearer ${token.value}`
//         // 'Content-Type': 'application/json'
//       }
//       //   body: JSON.stringify(body)
//     })
//     console.log(response)
//     blogPosts.value = await response.json()
//     // blogPosts = useBlogPostStore().blogPosts.contentlets
//     console.log(blogPosts)
//   } catch (e) {
//     console.error(e)
//   } finally {
//     isLoading.value = false
//   }
// }

onBeforeMount(() => {
  createJWT()
})
onMounted(() => {
  fetchBlogPosts()
})
</script>

<template>
  <main>
    <div v-if="!isLoading">{{ blogPosts }}</div>
  </main>
</template>
