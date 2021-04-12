import {Cell} from "./Cell";
import {Column} from "./Column";

export class Grid {
    playersCell: Cell;
    columnReach: number;

    head: Column;
    tail: Column;

    appendColumn: () => Column;
    prependColumn: () => Column;

    appendContainer: (column: Column, length: number) => Column;
    prependContainer: (column: Column, length: number) => Column;

    print: () => void;

    private constructor() {}

    static create() {
        const self = new Grid();
        self.head = Column.create(0);
        self.tail = self.head;

        self.appendColumn = () => appendColumn(self);
        self.prependColumn = () => prependColumn(self);
        self.appendContainer = (column, length) => appendContainer(self, column, length); 
        self.prependContainer = (column, length) => prependContainer(self, column, length); 
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

export const appendContainer = (self: Grid, column: Column, length: number) => {
    for (let i = 0; i < length; i++) {
        self.tail = self.tail.setNext(column.head);
        console.log(self.tail);
    }
    return self.tail;
}

export const prependContainer = (self: Grid, column: Column, length: number) => {
    let copyColumn: Column;
    return copyColumn;
}

//const updateGrid = (self: Grid, pos: PIXI.Point) => {
    //if (self.head.x < pos.x) {
        //self.head = self.head.next;
    //} else if (pos.x < self.head.x) {
        //self.head = self.head.previous;
    //}
//}
