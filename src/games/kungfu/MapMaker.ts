import * as PIXI from 'pixi.js';
import {GameComponent} from "src/components/base/GameComponent";

class Cell {
    tile: PIXI.Sprite;
    x: number;
    y: number;
    above: Cell;
    below: Cell;

    constructor(x: number, y: number, tile?: PIXI.Sprite) {
        this.x = x;
        this.y = y;
        this.tile = tile;
    }

    addToMapUpwards(stage: PIXI.Container): void {
        this.tile.x = this.x * tileSize;
        this.tile.y = this.y * tileSize;
        stage.addChild(this.tile);
        this.above?.addToMapUpwards(stage);
    }
}

class Pipeline {
    y: number;
    cell: Cell; // Baseline

    get isActive(): boolean {
        return this.cell ? true : false;
    }
}

class Column {
    readonly x: number; 
    // In future
    readonly pipelineTop = new Pipeline();
    readonly pipelineBottom = new Pipeline();

    private _next: Column;
    private _previous: Column;

    constructor(x: number) {
        this.x = x;
    }
    
    render() {
        // Draw cells
    }

    setNext(next: Column): Column {
        this._next = next;
        next._previous = this;
        return next;
    }

    get next(): Column {
        return this._next;
    }

    setPrevious(previous: Column): Column {
        this._previous = previous;
        previous._next = this;
        return previous;
    }

    get previous(): Column {
        return this._previous;
    }
}

class Grid {
    playersCell: Cell;
    renderReach: number;
    pipelineDelta: number;

    column: Column;

    updateGrid(pos: PIXI.Point) {
        if (this.column.x < pos.x) {
            this.column = this.column.next;
        } else if (pos.x < this.column.x) {
            this.column = this.column.previous;
        }

        this.column.pipelineTop.y = pos.y - this.pipelineDelta;
        this.column.pipelineBottom.y = pos.y + this.pipelineDelta;
    }
}

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
    grid.column = column0();
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
        let cell = column.pipelineBottom.cell;
        cell.addToMapUpwards(stage);
        column = column.next;
    }

    stage.addChild(tile);

}

export const column0 = () => {
    const column = new Column(0);
    column.pipelineBottom.cell = new Cell(column.x, 11, getTile(70))
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
