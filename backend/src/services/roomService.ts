const room = {
    roomName(chat_id: number): string { return process.env.ROOM_PREFIX + chat_id.toString(); }
}

export default room;