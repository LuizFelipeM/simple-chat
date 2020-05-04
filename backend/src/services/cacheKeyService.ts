const cacheKey = {
    keyName(id: number | string) { return `chat:${id}` }
}

export default cacheKey;