import * as PIXI from 'pixi.js';
import {GameComponent} from "src/components/base/GameComponent";
import {LOG} from 'src/utils/Logger';
import {Collision} from './CollisionType';
import {Column} from './Column';

export class Cell {
    tileTexture: PIXI.Texture;
    tileSprite: PIXI.Sprite;

    y: number;
    above: Cell;

    // Returns HEAD
    addCell: (add: Cell, column: Column) => void;
    addToStage: (component: GameComponent, x: number) => void;
    detectCollision: (other: PIXI.Sprite) => Collision;

    // Prints recursively
    print: () => void;

    private constructor() {}

    static create(y: number, tile: PIXI.Texture): Cell {
        const self = new Cell();
        self.y = y;
        self.tileTexture = tile;
        self.print = () => print(self);
        self.addCell = (add, head) => addCell(self, add, head);
        self.addToStage = (component, x) => addToStage(self, component, x);
        self.detectCollision = (other: PIXI.Sprite) => detectCollision(self, other);

        return self;
    }
}

const addCell = (self: Cell, add: Cell, column: Column): void => {
    if (add.y < self.y) {
        add.above = self;
        if (self === column.head) {
            column.head = add;
        }
    } else if (self.above) {
        self.above.addCell(add, column);
    } else {
        self.above = add;
    }
}

const addToStage = (self: Cell, component: GameComponent, x: number): void => {
    const { stage } = component.game.app
    const { TILE_SIZE } = component.resourceHandler;

    const sprite = new PIXI.Sprite(self.tileTexture);

    sprite.x = x * TILE_SIZE;
    sprite.y = self.y * TILE_SIZE;
    stage.addChild(sprite);
    self.above?.addToStage(component, x);
}

const collision = new Collision();

const detectCollision = (self: Cell, other: PIXI.Sprite): Collision => {
    if (self.tileSprite.y === other.y + other.height) {
        collision.bottom = true;
    } else if (self.tileSprite.y === other.y - other.height) {
        collision.top = true;
    }

    if (self.above) {
        return self.above.detectCollision(other);
    } else {
        return collision;
    }
}

const print = (self: Cell): void => {
    LOG.log('cell' , self.y, self.tileTexture);
    self.above?.print();
}
