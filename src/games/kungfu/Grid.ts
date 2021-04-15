import {Cell} from "./Cell";
import {Column} from "./Column";

export class Grid {
    playersCell: Cell;
    columnReach: number;

    head: Column;
    tail: Column;

    appendColumn: () => Column;
    prependColumn: () => Column;

    appendContainer: (length: number) => Column;
    prependContainer: (length: number) => Column;

    print: () => void;

    private constructor() {}

    static create() {
        const self = new Grid();
        self.head = Column.create(0);
        self.tail = self.head;

        self.appendColumn = () => appendColumn(self);
        self.prependColumn = () => prependColumn(self);
        self.appendContainer = (length) => appendContainer(self, length); 
        self.prependContainer = (length) => prependContainer(self, length); 
        return self;
    }

}

const appendColumn = (self: Grid): Column => {
    self.tail = self.tail.setNext();
    return self.tail;
}

const prependColumn = (self: Grid): Column => {
    self.head = self.head.setPrevious();
    return self.head;
}

export const appendContainer = (self: Grid, length: number) => {
    const column = self.tail;
    for (let i = 0; i < length; i++) {
        self.tail = self.tail.setNext(column.head);
    }
    return self.tail;
}

export const prependContainer = (self: Grid, length: number) => {
    const column = self.head;
    for (let i = 0; i < length; i++) {
        self.head = self.head.setPrevious(column.head);
    }
    return column;
}

//const updateGrid = (self: Grid, pos: PIXI.Point) => {
    //if (self.head.x < pos.x) {
        //self.head = self.head.next;
    //} else if (pos.x < self.head.x) {
        //self.head = self.head.previous;
    //}
//}
