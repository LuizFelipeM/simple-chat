export interface IModels<T> {
    index(): Promise<object[]>;
    show(query: string): Promise<object[]>;
    store(data: T): Promise<any>;
    update(data: T): Promise<any>;
    destroy(data: string): Promise<any>;
}