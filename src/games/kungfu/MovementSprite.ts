import * as PIXI from 'pixi.js';
import {GameComponent} from 'src/components/base/GameComponent';
import {Column} from './Column';

export enum Direction {
    WEST,
    EAST
}

export class MovementSprite extends PIXI.Sprite {
    velocityX: number;
    velocityY: number;

    currentColumn: Column;
    updateColumn: () => void;
    direction: Direction;

    get bottomY(): number {
        return this.y + this.height;
    }

    get endX(): number {
        return this.x + this.width;
    }

    constructor(component: GameComponent, x: number, y: number) {
        super();
        this.x = x;
        this.y = y;
        this.updateColumn = () => updateColumn(this, component);
    }
}

// TODO event listener column, entt houden zetten zelf cc
const updateColumn = (self: MovementSprite, component: GameComponent) => {
    const index = component.resourceHandler.characterGrid.getColumnIndex(self.x);

    if (index === self.currentColumn.x) {
        return;
    }

    if (index < self.currentColumn.x) {
        let column = self.currentColumn.previous;
        while (index !== column.x) {
            column = column.previous;
        }
        // todo out of bounds
        self.currentColumn = column;
    } else {
        let column = self.currentColumn.next;
        while (index !== column.x) {
            column = column.next;
        }
        // todo out of bounds
        self.currentColumn = column;
    }

}

