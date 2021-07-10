export const Promiser = <T>() => {
    let resolve: (value: T | PromiseLike<T>) => void
    let reject: (value: any) => void

    const promise = new Promise<T>((res, rej) => {
        resolve = res
        reject = rej
    })

    return {
        promise,
        resolve,
        reject
    }
}
