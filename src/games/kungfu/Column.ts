import {GameComponent} from 'src/components/base/GameComponent';
import {Cell} from "./Cell";

export class Column {
    x: number; 
    head: Cell;

    next: Column;
    previous: Column;

    addToStage: (component: GameComponent) => void;

    setNext: () =>  Column; 
    setPrevious: () =>  Column; 
    addCell: (cell: Cell) => void;

    private constructor() {}

    static create = (x: number): Column => {
        const self = new Column();
        self.x = x;
        self.setNext = () => setNext(self);
        self.setPrevious = () => setPrevious(self);
        self.addCell = (cell) => addCell(self, cell);
        self.addToStage = (component) => addToStage(self, component);
        return self;
    }
}

const setNext = (self: Column) => {
    const next = Column.create(self.x + 1);
    self.next = next;
    next.previous = self;
    return next;
}

const setPrevious = (self: Column) => {
    const previous = Column.create(self.x - 1);
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

const addToStage = (self: Column, component: GameComponent) => {
    self.head.addToStage(component, self.x);
}
