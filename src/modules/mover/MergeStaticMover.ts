import { StaticComponent } from 'src/components/base/StaticComponent';
import { Component } from 'src/components/base/Component';
import { FlowComponent } from 'src/components/base/FlowComponent';
import { ActionSelector, ActionUtil } from '../../utils/ActionTypes';

export const MergeStaticMover = (self: StaticComponent, parent: FlowComponent, action: ActionSelector): void => {
    const initialized = false;
    parent.mover.nextNodes.push(self);

    const move = (nextAction: ActionSelector): Component => {
        if (nextAction === ActionSelector.PREVIOUS || ActionUtil.isNext(nextAction) || action === nextAction) {
            return parent;
        } else {
            return self;
        }
    };

    self.mover = {
        action,
        initialized,
        move,
        parent,
        blocked: false
    };
};
