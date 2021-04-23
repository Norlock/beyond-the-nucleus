Array.prototype.remove = function<T>(item: T): T[] {
    return (this as Array<T>).splice(this.indexOf(item), 1);
}

Array.prototype.replace = function<T>(source: T, target: T): T[] {
    return (this as Array<T>).map(item => item === source ? target : item)
}

Number.prototype.isBetween = function (low: number, high: number) {
    return low < this.valueOf() && this.valueOf() < high;
}
