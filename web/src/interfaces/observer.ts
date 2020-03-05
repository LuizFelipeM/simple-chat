export default interface IObserver<T> {
    state: {};
    update(content: T): void;
}