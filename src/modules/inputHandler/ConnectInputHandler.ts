import { stopGame } from 'src/elm-bridge'
import { InputHandler } from './InputHandler'

let inputHandler: InputHandler

export const connectInputHandler = (self: InputHandler): void => {
    inputHandler = self

    document.removeEventListener('keydown', keyDown)
    document.removeEventListener('keyup', keyUp)
    document.removeEventListener('keypress', keyPress)

    document.addEventListener('keydown', keyDown)
    document.addEventListener('keyup', keyUp)
    document.addEventListener('keypress', keyPress)
}

const keyDown = (event: KeyboardEvent) => {
    inputHandler?.keyDown(event)
    if (event.key === 'Escape') {
        stopGame()
    }
}

const keyUp = (event: KeyboardEvent) => {
    inputHandler?.keyUp(event)
}

const keyPress = (event: KeyboardEvent) => {
    inputHandler?.keyPress(event)
}
