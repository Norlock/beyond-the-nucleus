import { Game } from "src/modules/game/Game";
import { Keyboard } from "src/modules/keyboard/Keyboard";
import { Resources } from "src/modules/resources/Resources";
import { FlowComponent } from "./FlowComponent";

export class GameComponent extends FlowComponent {
    keyboard: Keyboard;
    resources: Resources;
    game: Game;
}
