import { Component } from 'src/components/base/Component';
import { ActionPrevious, ActionSelector } from '../../utils/ActionTypes';

export interface Move {
    move(action: ActionSelector | ActionPrevious): Component;
    action: ActionSelector;
    initialized: boolean;
    blocked: boolean;
}

export interface MoveModule {
    mover: Move;
}
