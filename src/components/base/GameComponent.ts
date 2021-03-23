import {DefaultGameLoader} from "src/modules/game/GameLoader";
import { GameModule } from "src/modules/game/GameLoader";
import {InputHandler, InputHandlerModule} from "src/modules/inputHandler/InputHandler";
import { Resources, ResourcesModule } from "src/modules/resources/Resources";
import { FlowComponent } from "./FlowComponent";

export class GameComponent extends FlowComponent implements InputHandlerModule, ResourcesModule, GameModule {
    inputHandler: InputHandler;
    resources: Resources;
    game: DefaultGameLoader;
}
