import * as PIXI from 'pixi.js';
import {GameComponent} from "src/components/base/GameComponent";
import {LOG} from 'src/utils/Logger';
import {Collision} from './Collision';
import {Column} from './Column';
import {MovementSprite} from './MovementSprite';

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

    inYRange: (character: MovementSprite) => boolean;

    get tileTop(): number {
        return this.tileSprite.y;
    }

    get tileBottom(): number {
        return this.tileTop + this.tileSprite.height;
    }

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
        self.inYRange = (character) => inYRange(self, character);

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

    self.tileSprite = sprite;
}

const inYRange = (self: Cell, character: MovementSprite): boolean => {
    return character.y.isBetween(self.tileTop, self.tileBottom) ||
        character.bottomY.isBetween(self.tileTop, self.tileBottom);
}

const detectTopCollision = (self: Cell, character: MovementSprite, collision: Collision): void => {
    const characterNextY = character.y + character.velocityY;
    const tileBottomY = self.tileSprite.y + self.tileSprite.height;

    if (character.y <= tileBottomY && tileBottomY <= characterNextY) {
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

    if (tileTopY === characterBottomY) {
        collision.yRemainder = 0;
        collision.bottom = true;
    } else if (characterBottomY < tileTopY  && tileTopY <= characterNextBottomY) {
        collision.yRemainder = tileTopY - characterBottomY;
        collision.bottom = true;
    } else {
        self.above?.detectBottomCollision(character, collision);
    }
}

const detectLeftCollision = (self: Cell, character: MovementSprite, collision: Collision): void => {
    // TODO calculate virtual Y of char at this column
    if (self.inYRange(character)) {
        collision.left = true;
        collision.xRemainer = character.x - (self.tileSprite.x + self.tileSprite.width);
    } else {
        self.above?.detectLeftCollision(character, collision);
    }
}

const detectRightCollision = (self: Cell, character: MovementSprite, collision: Collision): void => {
    // TODO
    if (self.inYRange(character)) {
        collision.right = true;
        collision.xRemainer = (self.tileSprite.x + self.tileSprite.width) - character.x;
    } else {
        self.above?.detectLeftCollision(character, collision);
    }
}

const print = (self: Cell): void => {
    LOG.log('cell' , self.cellY, self.tileTexture);
    self.above?.print();
}
