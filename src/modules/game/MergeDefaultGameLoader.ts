import * as PIXI from 'pixi.js'
import { GameComponent } from 'src/components/base/GameComponent'
import { boardApp } from 'src/pixi/PixiApp'
import { DefaultGameLoader } from './GameLoader'

export const MergeDefaultGameLoader = (self: GameComponent) => {
    self.game = new DefaultGameLoader()
    const { game } = self

    const init = (): void => {
        game.busy = true

        boardApp.stop()
        game.app = gameApp()

        game.next?.init()
    }

    const cleanup = (): void => {
        game.next?.cleanup()

        game.app.destroy(true)
        boardApp.start()

        // TODO do something with this (disable input in Elm)
        //ComponentManager.connectInputHandler()

        game.busy = false
    }

    self.game.init = init
    self.game.cleanup = cleanup
}

const gameApp = (): PIXI.Application => {
    const gameCanvas = document.getElementById('game-canvas')
    const app = new PIXI.Application({
        width: gameCanvas.clientWidth,
        height: gameCanvas.clientHeight,
        resizeTo: gameCanvas,
        resolution: window.devicePixelRatio || 1,
        antialias: true
    })

    gameCanvas.appendChild(app.view)
    return app
}
