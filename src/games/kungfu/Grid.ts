import {Cell} from "./Cell";
import {Column} from "./Column";

export class Grid {
    playersCell: Cell;
    columnReach: number;

    head: Column;
    tail: Column;

    appendColumn: () => Column;
    prependColumn: () => Column;

    private constructor() {}

    static create() {
        const self = new Grid();
        self.head = Column.create(0);
        self.tail = self.head;

        self.appendColumn = () => appendColumn(self);
        self.prependColumn = () => prependColumn(self);
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

//const updateGrid = (self: Grid, pos: PIXI.Point) => {
    //if (self.head.x < pos.x) {
        //self.head = self.head.next;
    //} else if (pos.x < self.head.x) {
        //self.head = self.head.previous;
    //}
//}
