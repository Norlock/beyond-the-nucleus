import * as PIXI from 'pixi.js'
import { ComponentManager } from 'src/components/base/ComponentManager'
import { GameComponent } from 'src/components/base/GameComponent'
import { boardApp } from 'src/pixi/PixiApp'
import { DefaultGameLoader } from './GameLoader'

const gameCanvas = document.getElementById('game-canvas')

export const MergeDefaultGameLoader = (self: GameComponent) => {
    self.game = new DefaultGameLoader()
    const { game } = self

    const init = (): void => {
        game.busy = true

        // TODO apply in Elm
        //UIUtils.showCanvasBlur()
        //UIUtils.doAction(ActionSelector.GAME)
        //UIUtils.hideAllControls()

        boardApp.stop()
        game.app = gameApp()

        gameCanvas.appendChild(game.app.view)

        game.next?.init()
    }

    const cleanup = (): void => {
        game.next?.cleanup()

        game.app.destroy(true)
        boardApp.start()

        ComponentManager.connectInputHandler()

        game.busy = false
    }

    self.game.init = init
    self.game.cleanup = cleanup
}

const gameApp = (): PIXI.Application => {
    return new PIXI.Application({
        width: gameCanvas.clientWidth,
        height: gameCanvas.clientHeight,
        resizeTo: gameCanvas,
        resolution: window.devicePixelRatio || 1,
        antialias: true
    })
}
