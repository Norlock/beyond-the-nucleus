import { StaticComponent } from 'src/components/base/StaticComponent';
import { Component } from 'src/components/base/Component';
import { FlowComponent } from 'src/components/base/FlowComponent';
import { ActionSelector } from '../../utils/ActionTypes';

export const MergeStaticMover = (self: StaticComponent, parent: FlowComponent, action: ActionSelector): void => {
    parent.mover.nextNodes.push(self);

    const move = (nextAction: ActionSelector): Component => {
        if (nextAction === ActionSelector.PREVIOUS || action === ActionSelector.NEXT || action === nextAction) {
            return parent;
        } else {
            return self;
        }
    };

    self.mover = {
        action,
        move,
        parent
    };
};
