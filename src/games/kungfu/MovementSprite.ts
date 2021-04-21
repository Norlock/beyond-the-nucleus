import * as PIXI from 'pixi.js';
import {GameComponent} from 'src/components/base/GameComponent';
import {Column} from './Column';

export class MovementSprite extends PIXI.Sprite {
    velocityX: number;
    velocityY: number;

    currentColumn: Column;
    updateColumn: () => void;

    constructor(component: GameComponent, x: number, y: number) {
        super();
        this.x = x;
        this.y = y;
        this.anchor.set(0.5, 0);
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

