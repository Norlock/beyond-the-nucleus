export enum ActionSelector {
    NEXT = 's',
    PREVIOUS = 'b',
    VIDEO = 'v',
    INFO = 'i'
}

export enum ActionUI {
    TOGGLE_TOOLBAR = 't',
    TOGGLE_MUTE_UNMUTE = 'a'
}

export type ActionType = ActionSelector | ActionUI;

class ActionUtil {
    isSelector(action: ActionType) {
        return this.isType(ActionSelector, action);
    }

    isNext(action: ActionType) {
        return action === ActionSelector.NEXT;
    }

    isUI(action: ActionType): boolean {
        return this.isType(ActionUI, action);
    }

    private isType(constructor: any, action: ActionType): boolean {
        return <any>Object.values(constructor).includes(action);
    }

    isBranch(): boolean {
        // TODO
        return false;
    }

    getType(key: string): ActionType {
        const next = Object.values(ActionSelector).find((v) => v === key);
        if (next) return next;

        const ui = Object.values(ActionUI).find((v) => v === key);
        if (ui) return ui;

        return null;
    }
}

const action = new ActionUtil();
export { action as ActionUtil };
