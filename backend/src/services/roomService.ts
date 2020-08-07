const room = {
    createName: (chat_id: number) => `${process.env.ROOM_PREFIX}${chat_id}`
}

export default room;