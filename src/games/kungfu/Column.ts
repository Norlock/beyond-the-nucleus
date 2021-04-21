import {GameComponent} from 'src/components/base/GameComponent';
import {Cell} from "./Cell";
import {Collision} from './Collision';
import {MovementSprite} from './Movement';

export class Column {
    x: number; 
    head: Cell;

    next: Column;
    previous: Column;

    addToStage: (component: GameComponent) => void;

    setNext: (copyHead?: Cell) =>  Column; 
    setPrevious: (copyHead?: Cell) =>  Column; 
    addCell: (cell: Cell) => void;
    detectCollision: (character: MovementSprite) => Collision;

    private constructor() {}

    static create = (x: number): Column => {
        const self = new Column();
        self.x = x;
        self.setNext = (copyHead) => setNext(self, copyHead);
        self.setPrevious = (copyHead) => setPrevious(self, copyHead);
        self.addCell = (cell) => addCell(self, cell);
        self.addToStage = (component) => self.head.addToStage(component, self.x);
        self.detectCollision = (character) => detectCollision(self, character);
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

const detectCollision = (self: Column, character: MovementSprite): Collision => {
    const collision = new Collision();

    if (0 < character.velocityX) {
        // Detect right collision

    } else {
        // Detect left collision

    }

    if (0 <= character.velocityY) {
        self.head.detectBottomCollision(character, collision);
    } else {
        self.head.detectTopCollision(character, collision);
    }

    return collision;
}
