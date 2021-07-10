import { connectInputHandler } from 'src/modules/inputHandler/ConnectInputHandler'
import { InputHandler } from 'src/modules/inputHandler/InputHandler'
import { boardApp } from 'src/pixi/PixiApp'
import { Component } from './Component'
import { GameComponent } from './GameComponent'
import { PartChainer } from './PartChainer'

const pixiCanvas = document.getElementById('pixi-canvas')

let inputHandler: InputHandler

export enum ActionUI {
    TOGGLE_HELP = '?',
    TOGGLE_MUTE = 'm',
    TOGGLE_CANVAS_BLUR = 'blur',
    LEFT = 'ArrowLeft',
    RIGHT = 'ArrowRight',
    UP = 'ArrowUp',
    DOWN = 'ArrowDown'
}

const init = (): void => {
    let currentComponent: Component

    let keyPressed: string
    let isKeyDown: boolean

    pixiCanvas.appendChild(boardApp.view)

    const partChainer = PartChainer()
    const initial = partChainer.init('Kungfu')

    currentComponent = initial.component
    currentComponent.chapter.selector.chapterSelect(initial.component.pixi.containerName)

    const scroll = (): void => {
        if (keyDown) {
            switch (keyPressed) {
                case ActionUI.LEFT:
                    boardApp.stage.x += 10
                    break
                case ActionUI.RIGHT:
                    boardApp.stage.x -= 10
                    break
                case ActionUI.UP:
                    boardApp.stage.y += 10
                    break
                case ActionUI.DOWN:
                    boardApp.stage.y -= 10
                    break
            }
        }
    }

    boardApp.ticker.add(scroll)

    const keyUp = (): void => {
        isKeyDown = false
    }

    const keyDown = (event: KeyboardEvent): void => {
        if (isKeyDown && event.key !== keyPressed) return

        isKeyDown = true
        keyPressed = event.key
    }

    const keyPress = (event: KeyboardEvent) => {
        // TODO naar Elm
        //if (ActionUtil.isSelector(event.key)) {
        //if (currentComponent instanceof GameComponent && event.key === ActionSelector.GAME) {
        //if (!currentComponent.game.busy) {
        //currentComponent.game.init()
        //} else {
        //currentComponent.game.cleanup()
        //}
        //}
        //}
    }

    inputHandler = {
        keyPress,
        keyDown,
        keyUp
    }
}

export const ComponentManager = {
    init,
    connectInputHandler: () => connectInputHandler(inputHandler)
}
