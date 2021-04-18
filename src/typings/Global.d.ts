export {};

declare global {
    interface Array<T> {
        remove(item: T): Array<T>;
        replace(source: T, target: T): Array<T>;
    }

    interface Number {
        isBetween(low: number, high: number): boolean;
    }
}

declare module '*.ogg';

