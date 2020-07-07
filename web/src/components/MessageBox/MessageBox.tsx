import React, { useContext } from 'react'
import IMessage from '../../interfaces/Message'
import { WrapperContext } from '../../contexts/WrapperContext'

function MessageBox(props: { content: IMessage, id?: string }){
    const { currentUser } = useContext(WrapperContext)

    return (
        <div id={props.id} className={currentUser?.id === props?.content?.user_id ? "my-message" : "other-message"}>
            <div className="message-content">
                <header>
                    <span className="name">{props.content.user_name}</span>
                    <small className="timestamp">
                        {dateParser(props.content.message_sent_at).date && <span className="date">{dateParser(props.content.message_sent_at).date}</span>}
                        <span className="time">{dateParser(props.content.message_sent_at).time}</span>
                    </small>
                </header>
                <span className="message">{props?.content?.message}</span>
            </div>
        </div>
    )
}

const dateParser = (dateString: string) => {
    const date = new Date(dateString)
    const currentDate = new Date()

    const year = date.getFullYear()
    const month = date.getMonth()
    const dt = date.getDate()

    if(currentDate.getDate() !== dt || currentDate.getMonth() !== month || currentDate.getFullYear() !== year){
        const dd = dt < 10 ? `0${dt.toString()}` : dt
        const mm = month < 10 ? `0${month + 1}` : month + 1
        
        return {
            time: `${date.getHours()}:${date.getMinutes()} `,
            date: ` ${dd}/${mm}/${year}`
        }
    }

    return {
        time: `${date.getHours()}:${date.getMinutes()}`
    }
}

export default MessageBox