<script setup>
import { ref, onBeforeMount, onMounted } from 'vue'
import { useBlogPostStore } from '@/stores/blogPost'

const isLoading = ref(true)

let token = ref(null)
let blogPosts = ref()

const username = 'admin@dotcms.com'
const password = 'admin'
const blogPostUrl = 'https://demo.dotcms.com'

async function createJWT() {
  const endpoint = '/api/v1/authentication/api-token'
  //   const response = await fetch(`${blogPostUrl}${endpoint}`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       user: username,
  //       password: password,
  //       expirationDays: 10
  //     })
  //   })
  //   console.log(response)
  //   token = await response.json()
  console.log(token)
}

async function fetchBlogPosts() {
  const endpoint = '/api/content/query/live/10'

  try {
    isLoading.value = true
    // const response = await fetch(`${blogPostUrl}${endpoint}`, {
    //   method: 'GET',
    //   headers: {
    //     Authorization: `Bearer ${token}`
    //   }
    // })
    // console.log(response)
    // blogPosts = await response.json()
    blogPosts = useBlogPostStore().blogPosts.contentlets
    console.log(blogPosts)
  } catch (e) {
    console.error(e)
  } finally {
    isLoading.value = false
  }
}

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
