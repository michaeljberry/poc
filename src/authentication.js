import { useAuthTokenStore } from '@/stores/authToken'

const endpoint = '/api/v1/authentication/api-token'

async function createJWT() {
    const response = await fetch(`${import.meta.env.VITE_HOSTNAME}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: import.meta.env.VITE_USERNAME,
        password: import.meta.env.VITE_PASSWORD,
        expirationDays: 10
      })
    })
    const responseJson = await response.json();

    const store = useAuthTokenStore()

    store.authToken = responseJson.entity.token
  }

  export { createJWT }