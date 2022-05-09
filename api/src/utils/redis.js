import Redis from 'ioredis';
const redis = new Redis();


const invalidateCache = async (user_id) => {
    await redis.del('getAllItems');
    await redis.del(`getAllItemsByUser${user_id}`);
}

export default redis;
export { invalidateCache };
