import * as PIXI from 'pixi.js';
import {GameComponent} from "src/components/base/GameComponent";
import {Cell} from './Cell';
import {Grid} from './Grid';

let grid: Grid;
let resources: PIXI.IResourceDictionary;
let tileSize: number;

export const GenerateMap = (self: GameComponent): void => {
    // Make default grid
    const stage = self.game.app.stage;
    grid = Grid.create();
    grid.columnReach = 20;

    //stage = self.game.app.stage;
    resources = self.resourceHandler.resources;
    tileSize = self.resourceHandler.TILE_SIZE;

    const player = new PIXI.Sprite(resources.playerIdle.texture);
    player.x = 2 * tileSize;
    player.y = 3 * tileSize;
    player.scale.set(2);

    stage.addChild(player);
    
    // initial
    column0(grid);
    column1(grid);
    column2(grid);
    column3(grid);
    column4(grid);
    column5(grid);
    column6(grid);
    column7(grid);
    column8(grid);

    //grid.playersCell = new Cell(1, 1, tile);
}

export const getTile = (number: number): PIXI.Sprite => {
    return PIXI.Sprite.from(resources[`tile${number}`].texture);
}

export const RenderMap = (self: GameComponent): void => {
    let column = grid.head;
    while (column.next) {
        column.addToStage(self);
        column = column.next;
    }
}


export const column0 = (grid: Grid) => {
    const column = grid.head;
    column.addCell(Cell.create(11, getTile(70)));
    return column;
}

export const column1 = (grid: Grid) => {
    const column = grid.appendColumn();
    column.addCell(Cell.create(11, getTile(70)));
    return column;
}

export const column2 = (grid: Grid) => {
    const column = grid.appendColumn();
    column.addCell(Cell.create(11, getTile(70)));
    return column;
}

export const column3 = (grid: Grid) => {
    const column = grid.appendColumn();
    column.addCell(Cell.create(11, getTile(70)));
    return column;
}

export const column4 = (grid: Grid) => {
    const column = grid.appendColumn();
    column.addCell(Cell.create(11, getTile(70)));
    return column;
}

export const column5 = (grid: Grid) => {
    const column = grid.appendColumn();
    column.addCell(Cell.create(11, getTile(70)));
    return column;
}

export const column6 = (grid: Grid) => {
    const column = grid.appendColumn();
    column.addCell(Cell.create(11, getTile(70)));
    return column;
}

export const column7 = (grid: Grid) => {
    const column = grid.appendColumn();
    column.addCell(Cell.create(11, getTile(70)));
    return column;
}

export const column8 = (grid: Grid) => {
    const column = grid.appendColumn();
    column.addCell(Cell.create(11, getTile(70)));
    return column;
}
