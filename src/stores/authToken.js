import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthTokenStore = defineStore('authToken', () => {
    const authToken = ref()
    return { authToken }
})