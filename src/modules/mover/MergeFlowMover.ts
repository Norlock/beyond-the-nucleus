import { Component } from '../../components/base/Component';
import { FlowComponent } from '../../components/base/FlowComponent';
import { ActionPrevious, ActionSelector, ActionUtil } from '../../utils/ActionTypes';
import { UI } from '../ui/UI';

export const MergeFlowMover = (self: FlowComponent, previous: FlowComponent): void => {
    const nextNodes: Component[] = [];
    let index: number;  
    let blocked = false;

    const isRoot = (): boolean => {
        return previous === undefined;
    };

    if (!isRoot()) {
        previous.mover.nextNodes.push(self);
        index = previous?.mover.index + 1
    } else {
        index = 1
    }

    self.mover = {
        action: ActionSelector.NEXT,
        initialized: false,
        blocked,
        index,
        nextNodes,
        previous,
        isRoot,
        move: (action: ActionSelector | ActionPrevious) => move(self, action),
        updateControls: () => updateControls(self.ui, index, nextNodes)
    };
};

const updateControls = (ui: UI, index: number, nextNodes: Component[]): void => {
    ui.hideAllControls();
    ui.updateStep(index);

    nextNodes.forEach((node) => {
        if (node.mover.action === ActionSelector.VIDEO) {
            ui.showVideoControl();
        }
    });
};

const move = (self: FlowComponent, action: ActionSelector | ActionPrevious): Component => {
    //if (self.mover.blocked) {
        //return;
    //}

    if (ActionUtil.isPrevious(action)) {
        return self.mover.isRoot() ? self : self.mover.previous;
    }

    for (const node of self.mover.nextNodes) {
        if (node.mover.action === action) {
            return node;
        }
    }

    return self;
};

