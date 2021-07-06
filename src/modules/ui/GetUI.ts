import { UI, UIModule } from './UI'
import { Visibility } from '../../enums/Visibility'
import { ActionSelector, ActionUI } from 'src/utils/ActionTypes'
import { Chapter } from 'src/chapters/base/Chapter'

const ACTIVATE = 'activate'

const helpControl = document.getElementById('help-control')
const stepCounterElement = document.getElementById('page-number')
const previousControl = document.getElementById('previous-control')
const nextControl = document.getElementById('next-control')
const videoControl = document.getElementById('video-control')
const gameControl = document.getElementById('game-control')

const boardCanvas = document.getElementById('pixi-canvas')
const gameCanvas = document.getElementById('game-canvas')
const chapterTitle = document.getElementById('chapter-title')

export enum ControlType {
    NEXT,
    PREVIOUS,
    VIDEO,
    GAME
}

export const MergeUI = (self: UIModule): void => {
    self.ui = UIUtils
}

const updateStep = (index: number): void => {
    stepCounterElement.innerText = '' + index
}

const showControl = (controlType: ControlType): void => {
    switch (controlType) {
        case ControlType.NEXT:
            nextControl.classList.remove(Visibility.DISABLE)
            return
        case ControlType.PREVIOUS:
            previousControl.classList.remove(Visibility.DISABLE)
            return
        case ControlType.VIDEO:
            videoControl.classList.remove(Visibility.HIDE)
            return
        case ControlType.GAME:
            gameControl.classList.remove(Visibility.HIDE)
            return
    }
}

const hideControl = (controlType: ControlType): void => {
    switch (controlType) {
        case ControlType.NEXT:
            nextControl.classList.add(Visibility.DISABLE)
            return
        case ControlType.PREVIOUS:
            previousControl.classList.add(Visibility.DISABLE)
            return
        case ControlType.VIDEO:
            videoControl.classList.add(Visibility.HIDE)
            return
        case ControlType.GAME:
            gameControl.classList.add(Visibility.HIDE)
            return
    }
}

const hideAllControls = (): void => {
    hideControl(ControlType.NEXT)
    hideControl(ControlType.PREVIOUS)
    hideControl(ControlType.VIDEO)
    hideControl(ControlType.GAME)
}

const highlightUIControl = (action: string): void => {
    if (action === ActionUI.TOGGLE_HELP) {
        helpControl.classList.add(ACTIVATE)
    } else if (action === ActionSelector.NEXT) {
        nextControl.classList.add(ACTIVATE)
    } else if (action === ActionSelector.PREVIOUS) {
        previousControl.classList.add(ACTIVATE)
    }
}

const unhighlightUIControl = (action: string): void => {
    if (action === ActionUI.TOGGLE_HELP) {
        helpControl.classList.remove(ACTIVATE)
    } else if (action === ActionSelector.NEXT) {
        nextControl.classList.remove(ACTIVATE)
    } else if (action === ActionSelector.PREVIOUS) {
        previousControl.classList.remove(ACTIVATE)
    }
}

const doAction = (action: string): void => {
    if (action === ActionSelector.GAME) {
        gameCanvas.classList.toggle('show')
    } else if (action === ActionUI.TOGGLE_CANVAS_BLUR) {
        boardCanvas.classList.toggle('blur')
    }
}

const showCanvasBlur = (): void => {
    boardCanvas.classList.add('blur')
}

const hideCanvasBlur = (): void => {
    boardCanvas.classList.remove('blur')
}

const changeChapter = (self: Chapter): void => {
    document.body.classList.value = self.chapterType

    chapterTitle.classList.remove('animate')
    chapterTitle.innerText = self.title
    chapterTitle.offsetHeight // trigger a DOM reflow
    chapterTitle.classList.add('animate')
}

export const UIUtils: UI = {
    updateStep,
    hideAllControls,
    highlightUIControl,
    unhighlightUIControl,
    hideCanvasBlur,
    showCanvasBlur,
    doAction,
    changeChapter,
    showControl,
    hideControl
}
