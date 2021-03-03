export {};

declare global {
    interface Array<T> {
        remove(item: T): Array<T>;
        replace(source: T, target: T): Array<T>;
    }
}

declare module '*.ogg';

