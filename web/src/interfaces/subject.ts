import IObserver from "./observer";

export default interface ISubject {
    state: { observers: IObserver<any>[] };
    subscribe(observer: IObserver<any>): void;
    unsubscribe(observer: IObserver<any>): void;
    notifyAll(data: any): void;
}