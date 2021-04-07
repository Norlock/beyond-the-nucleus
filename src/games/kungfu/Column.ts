import {Cell} from "./Cell";

export class Column {
    x: number; 
    head: Cell;

    next: Column;
    previous: Column;

    addToStage: () => void;

    setNext: (next: Column) =>  Column; 
    setPrevious: (previous: Column) =>  Column; 
    addCell: (cell: Cell) => void;

    private constructor() {}

    static create = (x: number): Column => {
        const self = new Column();
        self.x = x;
        self.setNext = (next) => setNext(self, next);
        self.setPrevious = (previous) => setPrevious(self, previous);
        self.addCell = (cell) => addCell(self, cell);
        return self;
    }
}

const setNext = (self: Column, next: Column) => {
    self.next = next;
    next.previous = self;
    return next;
}

const setPrevious = (self: Column, previous: Column) => {
    self.previous = previous;
    previous.next = self;
    return previous;
}

const addCell = (self: Column, cell: Cell): void => {
    if (self.head) {
        self.head = self.head.addCell(cell, self.head);
    } else {
        self.head = cell;
    }
}
