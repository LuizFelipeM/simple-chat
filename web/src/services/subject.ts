import IObserver from "../interfaces/observer";
import ISubject from "../interfaces/subject";

export default class Subject implements ISubject {
    state: { observers: IObserver<any>[] } = { observers: [] };

    subscribe(observer: IObserver<any>) {
        this.state.observers.push(observer);
    }

    unsubscribe(observer: IObserver<any>) {
        const observerIndex = this.state.observers.findIndex((element: IObserver<any>) => element === observer)

        if(observerIndex !== -1)
            this.state.observers = this.state.observers.slice(observerIndex, 1);
    }

    notifyAll(data: any){
        if(this.state.observers.length)
            this.state.observers.forEach((observer: IObserver<any>) => {
                observer.update(data);
            })
    }
}