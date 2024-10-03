<script setup>
import { computed } from 'vue';

const props = defineProps({
    post:  {
        type: Object
    },
})

const formatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: '2-digit',
});

console.log(props.post)

const publishedDate = computed(() => {
    return formatter.format(new Date(props.post.publishDate))
})
// const posts = [
//   {
//     id: 1,
//     title: 'Boost your conversion rate',
//     href: '#',
//     description:π
//       'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
//     imageUrl:
//       'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80',
//     date: 'Mar 16, 2020',
//     datetime: '2020-03-16',
//     category: { title: 'Marketing', href: '#' },
//     author: {
//       name: 'Michael Foster',
//       role: 'Co-Founder / CTO',
//       href: '#',
//       imageUrl:
//         'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//     },
//   },
//   // More posts...
// ]
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
                <a :href="post.urlMap">
                    <span class="absolute inset-0" />
                    {{ post.title }}
                </a>
            </h3>
            <p class="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{{ post.teaser }}</p>
        </div>
    </div>

</template>
