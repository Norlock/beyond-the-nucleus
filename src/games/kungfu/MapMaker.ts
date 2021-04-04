import {GameComponent} from "src/components/base/GameComponent";

class GridNode {
    number: number;
    tile: PIXI.Sprite;
    above: GridNode;
    below: GridNode;

    constructor(number: number, tile?: PIXI.Sprite) {
        this.number = number;
        this.tile = tile;
    }

    setAbove(tile?: PIXI.Sprite) {
        this.above = new GridNode(this.number - 1, tile);
    }

    setBelow(tile?: PIXI.Sprite) {
        this.above = new GridNode(this.number + 1, tile);
    }
}

export const addToMap = (self: GameComponent): void => {
    // Make default grid
    const stage = self.game.app.stage;

    start = new GridNode(0, 5, 70);
    new MapNode(0, 6, 70);
    new MapNode(1, 5, 70);
    new MapNode(2, 5, 70);
    new MapNode(3, 5, 70);
    new MapNode(4, 5, 70);
    new MapNode(5, 5, 70);
}

export const addToMapT = (self: GameComponent, x: number, y: number, tile: number) => {

}

let stage: PIXI.Container;
let resources: PIXI.IResourceDictionary;
let tileSize: number;

export const generateMap = (self: GameComponent) => {
    stage = self.game.app.stage;
    resources = self.resourceHandler.resources;
    tileSize = self.resourceHandler.TILE_SIZE;

    initRecursively(start);
}

const initRecursively = (node: MapNode) => {
    let tile = PIXI.Sprite.from(resources[`tile${node.tile}`].texture);
    
    tile.x = node.x * tileSize;
    tile.y = node.y * tileSize;

    stage.addChild(tile);

    if (node.up) {
        initRecursively(node.up);
    }

    if (node.right) {

    }
}
