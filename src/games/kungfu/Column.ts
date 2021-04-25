import {GameComponent} from 'src/components/base/GameComponent';
import {Cell} from "./Cell";
import {Collision} from './Collision';
import {MovementSprite} from './MovementSprite';

export class Column {
    x: number; 
    head: Cell;

    next: Column;
    previous: Column;

    addToStage: (component: GameComponent) => void;

    setNext: (copyHead?: Cell) =>  Column; 
    setPrevious: (copyHead?: Cell) =>  Column; 
    addCell: (cell: Cell) => void;
    detectVerticalCollision: (character: MovementSprite) => Collision;
    detectRightCollision: (character: MovementSprite) => Collision;
    detectLeftCollision: (character: MovementSprite) => Collision;

    private constructor() {}

    static create = (component: GameComponent, x: number): Column => {
        const self = new Column();
        self.x = x;
        self.setNext = (copyHead) => setNext(self, component, copyHead);
        self.setPrevious = (copyHead) => setPrevious(self, component, copyHead);
        self.addCell = (cell) => addCell(self, cell);
        self.addToStage = (component) => self.head.addToStage(component, self.x);
        self.detectVerticalCollision = (character) => detectVerticalCollision(self, character);
        self.detectLeftCollision = (character) => detectLeftCollision(self, component, character);
        self.detectRightCollision = (character) => detectRightCollision(self, component, character);
        return self;
    }
}

// Head of cells 
const setNext = (self: Column, component: GameComponent, copyHead?: Cell) => {
    self.next = Column.create(component, self.x + 1);
    self.next.head = copyHead;
    self.next.previous = self;
    return self.next;
}

// Head of cells 
const setPrevious = (self: Column, component: GameComponent, copyHead?: Cell) => {
    self.previous = Column.create(component, self.x - 1);
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

const detectVerticalCollision = (self: Column, character: MovementSprite): Collision => {
    const collision = new Collision();

    // Velocity 0
    if (0 <= character.velocityY) {
        self.head.detectBottomCollision(character, collision);
    } else {
        self.head.detectTopCollision(character, collision);
    }

    return collision;
}

const detectLeftCollision = (self: Column, component: GameComponent, character: MovementSprite): Collision => {
    const collision = new Collision();

    const newX = character.x + character.velocityX;
    const targetIndex = component.resourceHandler.characterGrid.getColumnIndex(newX);

    if (targetIndex === self.x || self.previous === undefined) {
        return collision;
    }

    const detectCollisionRecursively = (column: Column): Collision => {
        column.head?.detectLeftCollision(character, collision);

        if (column.x !== targetIndex && !collision.left && column.previous) {
            return detectCollisionRecursively(column.previous);
        } else {
            return collision;
        }  
    }

    return detectCollisionRecursively(self.previous);

}


const detectRightCollision = (self: Column, component: GameComponent, character: MovementSprite): Collision => {
    const collision = new Collision();

    const newEndX = character.endX + character.velocityX;
    const targetIndex = component.resourceHandler.characterGrid.getColumnIndex(newEndX);

    if (targetIndex === self.x || self.next === undefined) {
        return collision;
    }

    const detectCollisionRecursively = (column: Column): Collision => {
        column.head?.detectRightCollision(character, collision);

        if (column.x !== targetIndex && !collision.right && column.next) {
            return detectCollisionRecursively(column.next);
        } else {
            return collision;
        }  
    }

    return detectCollisionRecursively(self.next);
}
