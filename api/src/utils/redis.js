import Redis from 'ioredis';
const redis = new Redis();

/**
 * Invalidate cache for a specific key and for getAllItem cache
 * @param {string} user_id 
 */
const invalidateCache = async (user_id) => {
    await redis.del('getAllItems');
    await redis.del(`getAllItemsByUser${user_id}`);
}

export default redis;
export { invalidateCache };
