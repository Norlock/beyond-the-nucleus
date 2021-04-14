import * as PIXI from 'pixi.js';
import {GameComponent} from "src/components/base/GameComponent";
import {connectInputHandler} from 'src/modules/inputHandler/ConnectInputHandler';
import {InputHandler} from "src/modules/inputHandler/InputHandler";

// TODO
export class Player extends PIXI.Sprite {
    health: number;
    weapon: any;

    idleEast: PIXI.Texture[] = [];
    idleWest: PIXI.Texture[] = [];
    idleNorth: PIXI.Texture[] = [];
    idleSouth: PIXI.Texture[] = [];

    walkEast: PIXI.Texture[] = [];
    walkWest: PIXI.Texture[] = [];
    walkNorth: PIXI.Texture[] = [];
    walkSouth: PIXI.Texture[] = [];

    attackEast: PIXI.Texture[] = [];
    attackWest: PIXI.Texture[] = [];
    attackNorth: PIXI.Texture[] = [];
    attackSouth: PIXI.Texture[] = [];

    private constructor() {
        super();
    }

    static create = (component: GameComponent): Player => {
        const self = new Player();
        component.inputHandler = inputHandler(self, component);
        connectInputHandler(component.inputHandler);
        initResources(self, component);
        return self;
    }
}

enum Direction {
    WEST,
    EAST
}

const inputHandler = (self: Player, component: GameComponent): InputHandler => {
    let isKeyDown: boolean;
    let keyPressed = 'd';
    let direction = Direction.EAST;

    const { stage } = component.game.app;

    const scroll = (): void => {
        if (isKeyDown) {
            switch (keyPressed) {
                case 'a':
                    self.x -= 10;
                    stage.x += 10;
                    self.texture = self.walkWest[(Math.floor(Date.now() / 150) % 4)];
                break;
                case 'd':
                    self.x += 10;
                    stage.x -= 10;
                    self.texture = self.walkEast[(Math.floor(Date.now() / 150) % 4)];
                break;
                case 'w':
                    self.y -= 10;
                    stage.y += 10;
                    self.texture = self.walkNorth[(Math.floor(Date.now() / 150) % 4)];
                break;
                case 's':
                    self.y += 10;
                    stage.y -= 10;
                    self.texture = self.walkSouth[(Math.floor(Date.now() / 150) % 4)];
                break;
                case ' ':
                    if (direction === Direction.WEST) {
                        self.texture = self.attackWest[(Math.floor(Date.now() / 150) % 4)];
                    } else {
                        self.texture = self.attackEast[(Math.floor(Date.now() / 150) % 4)];
                    }
                break;
            }
        } else {
            switch (direction) {
                case Direction.WEST:
                    self.texture = self.idleWest[(Math.floor(Date.now() / 150) % 4)];
                break;
                case Direction.EAST:
                    self.texture = self.idleEast[(Math.floor(Date.now() / 150) % 4)];
                break;
            }
            //self.texture = self.idleEast[(Math.floor(Date.now() / 150) % 4)];
        }
    };

    component.game.app.ticker.add(scroll);

    const keyUp = (event: KeyboardEvent): void => {
        isKeyDown = false;
    }

    const keyDown = (event: KeyboardEvent): void => {
        isKeyDown = true;
        console.log('keypress', event.key);

        //if (event.key 
        keyPressed = event.key;
    }

    const keyPress = (event: KeyboardEvent): void => {
        if (event.key === "\\") {
            const { devContainer } = component.resourceHandler;
            devContainer.visible = !devContainer.visible;
            component.game.app.render();
        } else if (event.key === "Escape") {
            component.game.cleanup();
        } else if (event.key === 'a') {
            direction = Direction.WEST;
        } else if (event.key === 'd') {
            direction = Direction.EAST;
        }  
    }

    return {
        keyUp,
        keyDown,
        keyPress,
    }
}

const initResources = (self: Player, component: GameComponent) => {
    const {resources} = component.resourceHandler;
    self.idleEast.push(new PIXI.Texture(resources.idleEast.texture.baseTexture, 
                                           new PIXI.Rectangle(0, 0, 16, 24)));
    self.idleEast.push(new PIXI.Texture(resources.idleEast.texture.baseTexture, 
                                           new PIXI.Rectangle(16, 0, 16, 24)));
    self.idleEast.push(new PIXI.Texture(resources.idleEast.texture.baseTexture, 
                                           new PIXI.Rectangle(32, 0, 16, 24)));
    self.idleEast.push(new PIXI.Texture(resources.idleEast.texture.baseTexture, 
                                           new PIXI.Rectangle(48, 0, 16, 24)));

    self.idleWest.push(new PIXI.Texture(resources.idleWest.texture.baseTexture, 
                                           new PIXI.Rectangle(0, 0, 16, 24)));
    self.idleWest.push(new PIXI.Texture(resources.idleWest.texture.baseTexture, 
                                           new PIXI.Rectangle(16, 0, 16, 24)));
    self.idleWest.push(new PIXI.Texture(resources.idleWest.texture.baseTexture, 
                                           new PIXI.Rectangle(32, 0, 16, 24)));
    self.idleWest.push(new PIXI.Texture(resources.idleWest.texture.baseTexture, 
                                           new PIXI.Rectangle(48, 0, 16, 24)));

    self.walkEast.push(new PIXI.Texture(resources.walkEast.texture.baseTexture, 
                                           new PIXI.Rectangle(0, 0, 16, 24)));
    self.walkEast.push(new PIXI.Texture(resources.walkEast.texture.baseTexture, 
                                           new PIXI.Rectangle(16, 0, 16, 24)));
    self.walkEast.push(new PIXI.Texture(resources.walkEast.texture.baseTexture, 
                                           new PIXI.Rectangle(32, 0, 16, 24)));
    self.walkEast.push(new PIXI.Texture(resources.walkEast.texture.baseTexture, 
                                           new PIXI.Rectangle(48, 0, 16, 24)));

    self.walkWest.push(new PIXI.Texture(resources.walkWest.texture.baseTexture, 
                                           new PIXI.Rectangle(0, 0, 16, 24)));
    self.walkWest.push(new PIXI.Texture(resources.walkWest.texture.baseTexture, 
                                           new PIXI.Rectangle(16, 0, 16, 24)));
    self.walkWest.push(new PIXI.Texture(resources.walkWest.texture.baseTexture, 
                                           new PIXI.Rectangle(32, 0, 16, 24)));
    self.walkWest.push(new PIXI.Texture(resources.walkWest.texture.baseTexture, 
                                           new PIXI.Rectangle(48, 0, 16, 24)));

    self.attackEast.push(new PIXI.Texture(resources.attackFSEast.texture.baseTexture, 
                                           new PIXI.Rectangle(0, 0, 24, 24)));
    self.attackEast.push(new PIXI.Texture(resources.attackFSEast.texture.baseTexture, 
                                           new PIXI.Rectangle(24, 0, 24, 24)));
    self.attackEast.push(new PIXI.Texture(resources.attackFSEast.texture.baseTexture, 
                                           new PIXI.Rectangle(48, 0, 24, 24)));
    self.attackEast.push(new PIXI.Texture(resources.attackFSEast.texture.baseTexture, 
                                           new PIXI.Rectangle(72, 0, 24, 24)));

    self.attackWest.push(new PIXI.Texture(resources.attackFSWest.texture.baseTexture, 
                                           new PIXI.Rectangle(0, 0, 24, 24)));
    self.attackWest.push(new PIXI.Texture(resources.attackFSWest.texture.baseTexture, 
                                           new PIXI.Rectangle(24, 0, 24, 24)));
    self.attackWest.push(new PIXI.Texture(resources.attackFSWest.texture.baseTexture, 
                                           new PIXI.Rectangle(48, 0, 24, 24)));
    self.attackWest.push(new PIXI.Texture(resources.attackFSWest.texture.baseTexture, 
                                           new PIXI.Rectangle(72, 0, 24, 24)));
}

