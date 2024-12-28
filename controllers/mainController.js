import { redisClient } from "../models/redisClient.js"

export const mainController = async (req, res) => {
    await redisClient.set("test", "this is the value", {
        EX: 10 // Set expiration time to 3 seconds
    });
    console.log("ping")
    console.log(process.env.REDIS_URL)
    return res.send({
        message: "Running"
    })
}

export const getRedisValue = async (req, res) => {
    console.log("getRedisValue executed")
    const resp = await redisClient.get("test")

    res.send({ resp })
}
