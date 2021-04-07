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
        self.appendColumn = () => appendColumn(self);
        self.prependColumn = () => prependColumn(self);
        return self;
    }

}

const appendColumn = (self: Grid): Column => {
    let column = self.head;
    while (column.next) {
        column = column.next;
    }

    return Column.create(column.x + 1);
}

const prependColumn = (self: Grid): Column => {
    let column = self.head;
    while (column.previous) {
        column = column.previous;
    }

    return Column.create(column.x - 1);
}

//const updateGrid = (self: Grid, pos: PIXI.Point) => {
    //if (self.head.x < pos.x) {
        //self.head = self.head.next;
    //} else if (pos.x < self.head.x) {
        //self.head = self.head.previous;
    //}
//}
