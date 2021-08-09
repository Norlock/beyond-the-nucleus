import * as PIXI from 'pixi.js'
import { GameComponent } from 'src/components/base/GameComponent'
import { Cell } from './Cell'
import { Grid } from './Grid'
import { Player } from './Player'

let resources: PIXI.utils.Dict<PIXI.LoaderResource>
let tileSize: number

export const GenerateMap = (self: GameComponent): void => {
    // Make default grid
    const stage = self.game.app.stage
    const grid = Grid.create(self)
    self.resourceHandler.characterGrid = grid
    self.resourceHandler.characterGrid.columnReach = 20 // TODO

    resources = self.resourceHandler.resources
    tileSize = self.resourceHandler.TILE_SIZE

    // initial
    column0(grid)
    column1(grid)
    column2(grid)
    column3(grid)
    column4(grid)
    column5(grid)
    column6(grid)
    column7(grid)

    grid.appendContainer(15)

    const player = Player.create(self, 100, 5 * tileSize)

    stage.addChild(player)
}

export const getTile = (number: number): PIXI.Texture => {
    return resources[`tile${number}`].texture
}

export const RenderMap = (self: GameComponent): void => {
    let column = self.resourceHandler.characterGrid.head
    while (column.next) {
        column.addToStage(self)
        column = column.next
    }
}

export const column0 = (grid: Grid) => {
    const column = grid.head
    column.addCell(Cell.create(10, getTile(70)))
    column.addCell(Cell.create(11, getTile(70)))
}

export const column1 = (grid: Grid) => {
    const column = grid.appendColumn()
    column.addCell(Cell.create(11, getTile(70)))
}

export const column2 = (grid: Grid) => {
    const column = grid.appendColumn()
    column.addCell(Cell.create(11, getTile(70)))
}

export const column3 = (grid: Grid) => {
    const column = grid.appendColumn()
    column.addCell(Cell.create(11, getTile(70)))
}

export const column4 = (grid: Grid) => {
    const column = grid.appendColumn()
    column.addCell(Cell.create(11, getTile(70)))
}

export const column5 = (grid: Grid) => {
    const column = grid.appendColumn()
    column.addCell(Cell.create(11, getTile(70)))
}

export const column6 = (grid: Grid) => {
    const column = grid.appendColumn()
    column.addCell(Cell.create(10, getTile(70)))
    column.addCell(Cell.create(11, getTile(70)))
}

export const column7 = (grid: Grid) => {
    const column = grid.appendColumn()
    column.addCell(Cell.create(11, getTile(70)))
}

export const column8 = (grid: Grid) => {
    const column = grid.appendColumn()
    column.addCell(Cell.create(11, getTile(70)))
}
