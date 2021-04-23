import {GameComponent} from "src/components/base/GameComponent";
import {Cell} from "./Cell";
import {Column} from "./Column";

export class Grid {
    playersCell: Cell;
    columnReach: number;

    head: Column;
    tail: Column;

    appendColumn: () => Column;
    prependColumn: () => Column;
    getColumn: (x: number) => Column;
    getColumnIndex: (x: number) => number;

    appendContainer: (length: number) => Column;
    prependContainer: (length: number) => Column;

    print: () => void;

    private constructor() {}

    static create(component: GameComponent) {
        const self = new Grid();
        self.head = Column.create(component, 0);
        self.tail = self.head;

        self.appendColumn = () => appendColumn(self);
        self.prependColumn = () => prependColumn(self);
        self.appendContainer = (length) => appendContainer(self, length); 
        self.prependContainer = (length) => prependContainer(self, length); 
        self.getColumnIndex = (x) => getColumnIndex(component, x);
        self.getColumn = (x) => getColumn(self, x);
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

const appendContainer = (self: Grid, length: number) => {
    const column = self.tail;
    for (let i = 0; i < length; i++) {
        // TODO kijken of head gecloned moet worden
        self.tail = self.tail.setNext(column.head);
    }
    return self.tail;
}

const prependContainer = (self: Grid, length: number) => {
    const column = self.head;
    for (let i = 0; i < length; i++) {
        // TODO kijken of head gecloned moet worden
        self.head = self.head.setPrevious(column.head);
    }
    return column;
}

const getColumnIndex = (component: GameComponent, x: number): number => {
    return Math.trunc(x / component.resourceHandler.TILE_SIZE);
}

const getColumn = (self: Grid, x: number): Column => {
    const columnX = self.getColumnIndex(x);
    let column = self.head;

    while (column.x !== columnX) {
        column = column.next;
    }

    return column;
}
