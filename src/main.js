import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
// import {
//   ApolloClient,
//   HttpLink,
//   InMemoryCache,
// } from "@apollo/client/core"
// import { ALL_BLOGS_QUERY } from '@/queries'

import App from './App.vue'
import router from './router'
import './index.css'

// const httpLink = new HttpLink({
//   uri: 'https://demo.dotcms.com/api/v1/graphql',
//   headers: {
//     authorization:
//     'Content-Type': 'application/graphql',
//     'DOT_API_CORS_DEFAULT_ACCESS_CONTROL_ALLOW_ORIGIN': '*',
//     'DOT_API_CORS_DEFAULT_ACCESS_CONTROL_ALLOW_HEADERS': '*',
//     'DOT_API_CORS_DEFAULT_ACCESS_CONTROL_ALLOW_METHODS': 'GET,PUT,POST,DELETE,HEAD,OPTIONS,PATCH',
//     'DOT_API_CORS_DEFAULT_ACCESS_CONTROL_ALLOW_CREDENTIALS': 'true',
//     'DOT_API_CORS_DEFAULT_ACCESS_CONTROL_EXPOSE_HEADERS': '*',
//     // 'Access-Control-Allow-Origin': '*',
//     // 'Access-Control-Allow-Headers': '*',
//     // 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,HEAD,OPTIONS,PATCH',
//     // 'Access-Control-Allow-Credentials': 'true',
//     // 'Access-Control-Expose-Headers': '*'
//   },
//   // fetchOptions: {
//   //   mode: 'no-cors'
//   // }
// })

// const cache = new InMemoryCache()

// const apolloClient = new ApolloClient({
//   link: httpLink,
//   fetchOptions:{
//     credentials: 'include'
//   },
//   cache,
// })

// apolloClient.query({
//   query: ALL_BLOGS_QUERY,
//   })
//   .then(res => {
//     console.log(res);
//   })

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
