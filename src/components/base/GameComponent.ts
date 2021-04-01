import {DefaultGameLoader} from "src/modules/game/GameLoader";
import { GameModule } from "src/modules/game/GameLoader";
import {InputHandler, InputHandlerModule} from "src/modules/inputHandler/InputHandler";
import { ResourceHandler, ResourcesModule } from "src/modules/resourceHandler/ResourceHandler";
import { FlowComponent } from "./FlowComponent";

export class GameComponent extends FlowComponent implements InputHandlerModule, ResourcesModule, GameModule {
    inputHandler: InputHandler;
    resourceHandler: ResourceHandler;
    game: DefaultGameLoader;
}
