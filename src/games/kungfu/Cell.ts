import * as PIXI from 'pixi.js';
import {GameComponent} from "src/components/base/GameComponent";
import {LOG} from 'src/utils/Logger';

export class Cell {
    tile: PIXI.Sprite;
    y: number;
    above: Cell;

    // Returns HEAD
    addCell: (add: Cell, head: Cell) => Cell;
    addToStage: (component: GameComponent, x: number) => void;

    // Prints recursively
    print: () => void;

    private constructor() {}

    static create(y: number, tile: PIXI.Sprite): Cell {
        const self = new Cell();
        self.y = y;
        self.tile = tile;
        self.print = () => print(self);
        self.addCell = (add, head) => addCell(self, add, head);
        self.addToStage = (component, x) => addToStage(self, component, x);
        return self;
    }
}

const addCell = (self: Cell, add: Cell, head: Cell): Cell => {
    if (add.y < self.y) {
        add.above = self;
        if (self === head) {
            return add;
        } else {
            return head;
        }
    } else if (self.above) {
        self.above.addCell(add, head);
    } else {
        self.above = add;
    }
}

const addToStage = (self: Cell, component: GameComponent, x: number): void => {
    const { stage } = component.game.app
    const { TILE_SIZE } = component.resourceHandler;

    self.tile.x = x * TILE_SIZE;
    self.tile.y = self.y * TILE_SIZE;
    stage.addChild(self.tile);
    self.above?.addToStage(component, x);
}

const print = (self: Cell): void => {
    self.above?.print();
}
