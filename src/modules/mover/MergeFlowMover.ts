import { Component } from '../../components/base/Component';
import { FlowComponent } from '../../components/base/FlowComponent';
import { ActionSelector } from '../../utils/ActionTypes';
import { UI } from '../ui/UI';

export const MergeFlowMover = (self: FlowComponent, index: number) => {
    const nextNodes: Component[] = [];

    self.mover = {
        action: ActionSelector.NEXT,
        blocked: false,
        index,
        nextNodes,
        previous: undefined,
        move: (action: ActionSelector) => move(self, action),
        updateControls: () => updateControls(self.ui, index, nextNodes)
    };
};

export const MergeFlowMoverPrevious = (self: FlowComponent, previous: FlowComponent) => {
        if (self.mover.previous) {
            throw Error("Previous has already been set");
        }

        previous.mover.nextNodes.push(self);
        self.mover.previous = previous;
}

const updateControls = (ui: UI, index: number, nextNodes: Component[]): void => {
    ui.hideAllControls();
    ui.updateStep(index);

    nextNodes.forEach((node) => {
        if (node.mover.action === ActionSelector.VIDEO) {
            ui.showVideoControl();
        }
    });
};

const move = (self: FlowComponent, action: ActionSelector): Component => {
    if (self.mover.blocked) {
        return self;
    }

    self.mover.blocked = true;

    if (action === ActionSelector.PREVIOUS) {
        return self.mover.previous ?? self;
    }

    for (const node of self.mover.nextNodes) {
        if (node.mover.action === action) {
            return node;
        }
    }

    return self;
};

