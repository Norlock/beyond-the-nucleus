import { Media } from 'src/modules/media/Media';
import { Static } from 'src/modules/mover/Static';
import { Component } from './Component';

export class StaticComponent extends Component {
    mover: Static;
    media: Media;
}
