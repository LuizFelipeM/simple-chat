export default interface IRepository<T> {
    index(): Promise<T[]>;
    show(query: string): Promise<T[]>;
    store(data: T): Promise<any>;
    update(data: T): Promise<any>;
    destroy(data: T): Promise<any>;
}