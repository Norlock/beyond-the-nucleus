import {GameComponent} from 'src/components/base/GameComponent';
import {Cell} from "./Cell";

export class Column {
    x: number; 
    head: Cell;

    next: Column;
    previous: Column;

    addToStage: (component: GameComponent) => void;

    setNext: (copyHead?: Cell) =>  Column; 
    setPrevious: (copyHead?: Cell) =>  Column; 
    addCell: (cell: Cell) => void;

    private constructor() {}

    static create = (x: number): Column => {
        const self = new Column();
        self.x = x;
        self.setNext = (copyHead) => setNext(self, copyHead);
        self.setPrevious = (copyHead) => setPrevious(self, copyHead);
        self.addCell = (cell) => addCell(self, cell);
        self.addToStage = (component) => self.head.addToStage(component, self.x);
        return self;
    }
}

// Head of cells 
const setNext = (self: Column, copyHead?: Cell) => {
    self.next = Column.create(self.x + 1);
    self.next.head = copyHead;
    self.next.previous = self;
    return self.next;
}

// Head of cells 
const setPrevious = (self: Column, copyHead?: Cell) => {
    self.previous = Column.create(self.x - 1);
    self.previous.head = copyHead;
    self.previous.next = self;
    return self.previous;
}

const addCell = (self: Column, cell: Cell): void => {
    if (self.head) {
        self.head.addCell(cell, self);
    } else {
        self.head = cell;
    }
}

const detectCollision = (self: Cell, x: number, y: number, vx: number, vy: number): Collision => {
    const collision = new Collision();
    // Maybe return collision object with remaining x,y to avoid recal?
    if (0 < vx) {


    } else {

    }

    return collision;
}
