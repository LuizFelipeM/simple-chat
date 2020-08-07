const cacheKey = {
    chatKeyName: (id: number | string) => `chat:${id}`,
    generateKeyName: (key: string, id: number | string) => `${key}:${id}`
}

export default cacheKey;