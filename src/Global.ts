Array.prototype.remove = function<T>(item: T): T[] {
    const self = this as Array<T>;
    return self.splice(self.indexOf(item), 1);
}

Array.prototype.replace = function<T>(source: T, target: T): T[] {
    const self = this as Array<T>;
    return self.map(item => item === source ? target : item)
}
