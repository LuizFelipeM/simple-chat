import React from 'react';
import { AxiosResponse } from 'axios';

import '../styles/chat.css';

import Message from './Message';
import { subToSocketMessages } from '../services/socket';
import ComponentObserver from '../services/component.observer';
import IContent from '../interfaces/content';
// import api from '../services/api';

let messageListener: ComponentObserver<IContent>;

class Chat extends React.Component<{chat: any}, {data: { chat_id: Number | null, content: IContent[]}}> {
    constructor(props: { chat: any }){
        super(props);

        this.state = { data: { chat_id: null, content: []} };
        
        messageListener = new ComponentObserver(this);
        subToSocketMessages(messageListener);
    }

    componentDidUpdate(){ console.log('state content', this.state.data) }

    render(){
        return (
            <div className="chat">
                {this.state.data?.content?.map((content: IContent, index: number) =>
                    <Message key={index} content={content} />
                )}
            </div>
        )
    }
    
}

// function Chat({ chat, content }: any){
//     const [contents, setContents] = useState<IContent[]>([]);

//     useEffect(()=>{
//         console.log(content)
//         // console.log(contents)
//         setContents(content)
//         // async function messages(){
//         //     const response: AxiosResponse<any> = await api.get('/chats/messages', { params: { where: `chat_id=${chat?chat.chat_id:null}` } });

//         //     setContent(response?.data[0]?.content);
//         // }

//         // messages();
//     }, [])

//     // useEffect(()=>{ console.log('Chat contents[]', contents); }, [contents]);

//     return (
//         <div className="chat">
//             {contents?.map((content: IContent, index: number) =>
//                 <Message key={index} content={content} />
//             )}
//         </div>
//     );
// }

export default Chat;