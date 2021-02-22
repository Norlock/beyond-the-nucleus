import { Component } from 'src/components/base/Component';
import { ActionSelector } from '../../utils/ActionTypes';

export interface Move {
    move(action: ActionSelector): Component;
    action: ActionSelector;
    initialized: boolean;
    blocked: boolean;
}

export interface MoveModule {
    mover: Move;
}