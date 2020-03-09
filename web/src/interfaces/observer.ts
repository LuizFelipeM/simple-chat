export default interface IObserver<T> {
    state: {};
    update(data: T): void;
}