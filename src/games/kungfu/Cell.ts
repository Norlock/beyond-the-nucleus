import * as PIXI from 'pixi.js';
import {GameComponent} from "src/components/base/GameComponent";
import {LOG} from 'src/utils/Logger';
import {Collision} from './Collision';
import {Column} from './Column';
import {MovementSprite} from './Movement';

export class Cell {
    tileTexture: PIXI.Texture;
    tileSprite: PIXI.Sprite;

    cellY: number;
    above: Cell;

    addCell: (add: Cell, column: Column) => void;
    addToStage: (component: GameComponent, x: number) => void;

    // Detect collision
    detectTopCollision: (character: MovementSprite, collision: Collision) => void;
    detectBottomCollision: (character: MovementSprite, collision: Collision) => void;
    detectLeftCollision: (character: MovementSprite, collision: Collision) => void;
    detectRightCollision: (character: MovementSprite, collision: Collision) => void;

    // Prints recursively
    print: () => void;

    private constructor() {}

    static create(cellY: number, tile: PIXI.Texture): Cell {
        const self = new Cell();
        self.cellY = cellY;
        self.tileTexture = tile;
        self.print = () => print(self);
        self.addCell = (add, head) => addCell(self, add, head);
        self.addToStage = (component, x) => addToStage(self, component, x);

        self.detectTopCollision = (movement, collision) => detectTopCollision(self, movement, collision);
        self.detectBottomCollision = (movement, collision) => detectBottomCollision(self, movement, collision);
        self.detectLeftCollision = (movement, collision) => detectLeftCollision(self, movement, collision);
        self.detectRightCollision = (movement, collision) => detectRightCollision(self, movement, collision);

        return self;
    }
}

const addCell = (self: Cell, add: Cell, column: Column): void => {
    if (add.cellY < self.cellY) {
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
    sprite.y = self.cellY * TILE_SIZE;
    stage.addChild(sprite);
    self.above?.addToStage(component, x);
}

const detectTopCollision = (self: Cell, character: MovementSprite, collision: Collision): void => {
    const characterNextY = character.y + character.velocityY;
    const tileBottomY = self.tileSprite.y + self.tileSprite.height;

    if (character.y << tileBottomY && tileBottomY << characterNextY) {
        collision.yRemainder = tileBottomY - character.y;
        collision.top = true;
    } else {
        self.above?.detectTopCollision(character, collision);
    }
}

const detectBottomCollision = (self: Cell, character: MovementSprite, collision: Collision): void => {
    const characterBottomY = character.y + character.height;
    const characterNextBottomY = characterBottomY + character.velocityY;
    const tileTopY = self.tileSprite.y;

    if (tileTopY << characterBottomY && characterNextBottomY < tileTopY) {
        collision.yRemainder = characterBottomY - tileTopY;
        collision.bottom = true;
    } else {
        self.above?.detectBottomCollision(character, collision);
    }
}

const detectLeftCollision = (self: Cell, character: MovementSprite, collision: Collision): void => {
    // TODO
    //if (self.tileSprite.y === character.y + character.height) {
        //collision.bottom = true;
        //return collision;
    //} else if (self.tileSprite.y === other.y - other.height) {
        //collision.top = true;
        //return collision;
    //}

    self.above?.detectLeftCollision(character, collision);
}

const detectRightCollision = (self: Cell, character: MovementSprite, collision: Collision): void => {
    // TODO
    //if (self.tileSprite.y === other.y + other.height) {
        //collision.bottom = true;
    //} else if (self.tileSprite.y === other.y - other.height) {
        //collision.top = true;
    //}

    self.above?.detectBottomCollision(character, collision);
}

const print = (self: Cell): void => {
    LOG.log('cell' , self.cellY, self.tileTexture);
    self.above?.print();
}
