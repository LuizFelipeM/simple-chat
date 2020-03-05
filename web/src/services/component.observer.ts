import IObserver from "../interfaces/observer";
import { Component } from "react";

export default class ComponentObserver<T> implements IObserver<T> {
    state: { 
        data: { chat_id: Number | null, content: T[] },
        component: Component<{}, {data: any}> | null,
        stateKeyToUpdate: any
    } = {
        data: {
            chat_id: null,
            content: []
        },
        component: null,
        stateKeyToUpdate: null
    };

    constructor(component: Component<{}, {data: any}>){
        this.state.component = component;
    }

    update(data: T){
        // Precisa dar deep merge dos obj
        // para poder criar um obj com o chat_id e content legivel pelo chat
        // com esse obj (já que tem chat_id) vai ser possível separar os chats
        this.state.data = {...this.state.data, ...data};

        this.state.component?.setState(() => {
            return { data: this.state.data }
        })
    }
}