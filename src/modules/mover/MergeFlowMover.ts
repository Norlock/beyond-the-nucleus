import { Component } from '../../components/base/Component';
import { FlowComponent } from '../../components/base/FlowComponent';
import { ActionSelector } from '../../utils/ActionTypes';
import {ControlType} from '../ui/GetUI';

export const MergeFlowMover = (self: FlowComponent, index: number) => {
    const nextNodes: Component[] = [];

    self.mover = {
        action: ActionSelector.NEXT,
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
        ui.showControl(ControlType.PREVIOUS);
    }

    mover.nextNodes.forEach(node => {
        switch (node.mover.action) {
            case ActionSelector.VIDEO:
                ui.showControl(ControlType.VIDEO);
                break;
            case ActionSelector.NEXT:
                ui.showControl(ControlType.NEXT);
                break;
        }
    });
};

const move = (self: FlowComponent, action: ActionSelector): Component => {
    if (action === ActionSelector.PREVIOUS) {
        return self.mover.previous ?? self;
    } else {
        return self.mover.nextNodes.find(x => x.mover.action === action) ?? self;
    }
};

