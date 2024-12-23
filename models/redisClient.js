import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();


const redisClient = createClient({
    url: process.env.REDIS_URL
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));

redisClient.connect()
    .then(() => {
        console.log('Redis successfully connected');
    })
    .catch(console.error);

export { redisClient };
