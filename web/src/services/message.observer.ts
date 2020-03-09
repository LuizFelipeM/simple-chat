import { Component } from "react";

import IObserver from "../interfaces/observer";
import IMessage from "../interfaces/content";

interface IReceivedData {
    chat_id: number,
    content: IMessage
}

export default class MessageObserver implements IObserver<IReceivedData> {
    state: { 
        data: {
            chat_id: number | null,
            content: IMessage[]
        }[],
        component: Component<{}, {data: any}> | null,
        stateKeyToUpdate: any
    } = {
        data: [],
        component: null,
        stateKeyToUpdate: null
    };

    constructor(component: Component<{}, {data: any}>){
        this.state.component = component;
    }

    update(data: IReceivedData){
        const convertedData = {
            chat_id: data.chat_id,
            content: [data.content]
        };

        if (this.state.data.length) {
            let chatExist: boolean = false;

            this.state.data.forEach((chat, index) => {
                if (chat.chat_id === data.chat_id) {
                    chatExist = true;
                    this.state.data[index].content.push(data.content);
                }
            });

            if(!chatExist)
                this.state.data.push(convertedData);
        } else           
            this.state.data.push(convertedData);

        this.state.component?.setState(() => {
            return { data: this.state.data }
        })
    }
}