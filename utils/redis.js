// redis.config.js
import Redis from "redis";

const client = Redis.createClient()

client.on("error", (error) => {
    console.log('Redis Client Error', error)
})

const connectRedis = async () => {
    try {
        await client.connect()
        console.log('Connected to Redis successfully!');
    } catch (error) {
        console.log("redis connection failed", error)
    }
}

export { client, connectRedis }