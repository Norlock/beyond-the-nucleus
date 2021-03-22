export enum ActionSelector {
    NEXT = 's',
    PREVIOUS = 'b',
    VIDEO = 'v',
    INFO = 'i',
    GAME = 'p',
}

export enum ActionUI {
    TOGGLE_HELP = '?',
    TOGGLE_MUTE = 'm',
    TOGGLE_CANVAS_BLUR = 'blur',
    LEFT = 'ArrowLeft',
    RIGHT = 'ArrowRight',
    UP = 'ArrowUp',
    DOWN = 'ArrowDown'
}

export type ActionType = ActionSelector | ActionUI;

class ActionUtil {
    isSelector(key: string) {
        return Object.values(ActionSelector).includes(key as ActionSelector);
    }

    isUI(key: string): boolean {
        return Object.values(ActionUI).includes(key as ActionUI);
    }

    isBranch(): boolean {
        // TODO
        return false;
    }
}

const action = new ActionUtil();
export { action as ActionUtil };
