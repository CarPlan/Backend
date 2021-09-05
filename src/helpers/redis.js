const redis = require("redis");
const { promisify } = require("util");

const redisClient = redis.createClient(process.env.REDIS_PORT || 6379, process.env.REDIS_HOST || "localhost");
const getAsync = promisify(redisClient.get).bind(redisClient);

function cacheUser(user){
    redisClient.setex('' + user.id, "3600", JSON.stringify(user), err => {
        if(err)
            console.log(err)
            });
}


async function getUserFromCache(id){
    const data =  await getAsync(id);
    if(data == null)
        return null;
    return JSON.parse(data);
}



module.exports = {redisClient: redisClient, cacheUser : cacheUser, getUserFromCache: getUserFromCache};