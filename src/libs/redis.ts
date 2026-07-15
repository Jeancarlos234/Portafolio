    import { Redis } from '@upstash/redis'

    export const redis = new Redis({
    url: import.meta.env.VITE_KV_REST_API_URL as string,
    token: import.meta.env.VITE_KV_REST_API_TOKEN as string,
    })