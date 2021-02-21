import { FlowComponent } from 'src/components/base/FlowComponent';
import { Move } from './Move';

export interface Static extends Move {
    parent: FlowComponent;
}
