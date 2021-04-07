import * as PIXI from 'pixi.js';
import {GameComponent} from "src/components/base/GameComponent";
import {Cell} from './Cell';
import {Column} from './Column';


let grid: Grid;
let resources: PIXI.IResourceDictionary;
let tileSize: number;

export const GenerateMap = (self: GameComponent): void => {
    // Make default grid
    const stage = self.game.app.stage;
    grid = new Grid();
    grid.renderReach = 20;
    grid.pipelineDelta = 10;

    //stage = self.game.app.stage;
    resources = self.resourceHandler.resources;
    tileSize = self.resourceHandler.TILE_SIZE;

    let tile = getTile(70);
    let next: Column;

    const player = new PIXI.Sprite(resources.playerIdle.texture);
    player.x = 2 * tileSize;
    player.y = 3 * tileSize;
    player.scale.set(2);

    stage.addChild(player);
    
    // initial
    grid.head = column0();
    next = grid.column.setNext(column1());
    next = next.setNext(column2());
    next = next.setNext(column3());
    next = next.setNext(column4());
    next = next.setNext(column5());
    next = next.setNext(column6());
    next = next.setNext(column7());
    next = next.setNext(column8());

    grid.playersCell = new Cell(1, 1, tile);
}

export const getTile = (number: number): PIXI.Sprite => {
    return PIXI.Sprite.from(resources[`tile${number}`].texture);
}

export const RenderMap = (self: GameComponent): void => {
    const { stage } = self.game.app;

    const cell = grid.playersCell;
    const tile = cell.tile;

    tile.x = cell.x * self.resourceHandler.TILE_SIZE;
    tile.y = cell.y * self.resourceHandler.TILE_SIZE;

    let column = grid.column;
    while (column.next) {
        column.cell.addToMapUpwards(stage);
        column = column.next;
    }

    stage.addChild(tile);

}


export const cont

export const column0 = () => {
    const column = Column.create(0);
    column.addCell(Cell.create(11, getTile(70));
    return column;
}

export const column1 = () => {
    const column = new Column(1);
    column.pipelineBottom.cell = new Cell(column.x, 11, getTile(70))
    return column;
}

export const column2 = () => {
    const column = new Column(2);
    column.pipelineBottom.cell = new Cell(column.x, 11, getTile(70))
    column.pipelineBottom.cell.
    return column;
}

export const column3 = () => {
    const column = new Column(3);
    column.pipelineBottom.cell = new Cell(column.x, 11, getTile(70))
    return column;
}

export const column4 = () => {
    const column = new Column(4);
    column.pipelineBottom.cell = new Cell(column.x, 11, getTile(70))
    return column;
}

export const column5 = () => {
    const column = new Column(5);
    column.pipelineBottom.cell = new Cell(column.x, 11, getTile(70))
    return column;
}

export const column6 = () => {
    const column = new Column(6);
    column.pipelineBottom.cell = new Cell(column.x, 11, getTile(70))
    return column;
}

export const column7 = () => {
    const column = new Column(7);
    column.pipelineBottom.cell = new Cell(column.x, 11, getTile(70))
    return column;
}

export const column8 = () => {
    const column = new Column(8);
    column.pipelineBottom.cell = new Cell(column.x, 11, getTile(70))
    return column;
}
