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
        updateControls: () => updateControls(self)
    };
};

export const MergeFlowMoverPrevious = (self: FlowComponent, previous: FlowComponent) => {
        if (self.mover.previous) {
            throw Error("Previous has already been set");
        }

        previous.mover.nextNodes.push(self);
        self.mover.previous = previous;
}

const updateControls = (self: FlowComponent): void => {
    const { ui, mover } = self;
    ui.hideAllControls();
    ui.updateStep(mover.index);

    if (mover.previous) {
        ui.showPreviousControl();
    }

    mover.nextNodes.forEach(node => {
        switch (node.mover.action) {
            case ActionSelector.VIDEO:
                ui.showVideoControl();
                break;
            case ActionSelector.NEXT:
                ui.showNextControl();
                break;
        }
    });
};

const move = (self: FlowComponent, action: ActionSelector): Component => {
    if (self.mover.blocked) {
        return self;
    }

    let result: Component;

    if (action === ActionSelector.PREVIOUS) {
        result = self.mover.previous ?? self;
    } else {
        result = self.mover.nextNodes.find(x => x.mover.action === action) ?? self;
    }

    // Don't block if the next one is self.
    // You can't move otherwise anymore.
    self.mover.blocked = (result !== self);
    return result;

};

