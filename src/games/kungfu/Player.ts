import * as PIXI from 'pixi.js';
import {GameComponent} from "src/components/base/GameComponent";
import {connectInputHandler} from 'src/modules/inputHandler/ConnectInputHandler';
import {InputHandler} from "src/modules/inputHandler/InputHandler";
import {Column} from './Column';
import {MovementSprite} from './MovementSprite';

// TODO
// if in air disable LR movement
export class Player extends MovementSprite {
    health: number;
    weapon: any;
    currentColumn: Column;

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

    private constructor(component: GameComponent, x: number, y: number) {
        super(component, x, y); 
        this.velocityY = 0;
        this.velocityX = 0;
    }

    static create = (component: GameComponent, x: number, y: number): Player => {
        const self = new Player(component, x, y);
        self.currentColumn = component.resourceHandler.characterGrid.getColumn(x);

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
    let keyPressed: string;
    let direction = Direction.EAST;

    const { stage } = component.game.app;

    const scroll = (): void => {
        applyGravity(self);

        if (isKeyDown) {
            switch (keyPressed) {
                case 'a':
                    moveLeft(self, stage);
                break;
                case 'd':
                    moveRight(self, stage);
                break;
                case 'w':
                    moveTop(self, stage);
                break;
                case 's':
                    moveBottom(self, stage);
                break;
                case ' ':
                    attack(self, direction);
                break;
            }
        } else {
            idle(self, direction);
        }

        //component.game.app.render();
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

const moveLeft = (self: Player, stage: PIXI.Container) => {
    self.texture = self.walkWest[(Math.floor(Date.now() / 150) % 4)];

    if (0 < self.velocityX) 
        self.velocityX = 0;

    if (self.velocityX > -9) 
        self.velocityX -= 3;

    const collision = self.currentColumn.detectLeftCollision(self);

    if (collision.left) {
        self.x += collision.xRemainer;
        stage.x -= collision.xRemainer; 
    } else {
        self.x += self.velocityX;
        stage.x -= self.velocityX;
    }

    self.updateColumn();
}

const moveRight = (self: Player, stage: PIXI.Container) => {
    self.texture = self.walkEast[(Math.floor(Date.now() / 150) % 4)];

    if (self.velocityX < 0) 
        self.velocityX = 0;
    
    if (self.velocityX < 9) 
        self.velocityX += 3;

    const collision = self.currentColumn.detectRightCollision(self);

    if (collision.right) {
        self.x += collision.xRemainer;
        stage.x -= collision.xRemainer; 
    } else {
        self.x += self.velocityX;
        stage.x -= self.velocityX;
    }

    self.updateColumn();
}

const moveTop = (self: Player, stage: PIXI.Container) => {
    // Jump / todo ladder climbing
    //self.y -= 10;
    //stage.y += 10;
    self.texture = self.walkNorth[(Math.floor(Date.now() / 150) % 4)];
}

const moveBottom = (self: Player, stage: PIXI.Container) => {
    // Jump / todo ladder descending
    //self.y += 10;
    //stage.y -= 10;
    self.texture = self.walkSouth[(Math.floor(Date.now() / 150) % 4)];
}

const attack = (self: Player, direction: Direction) => {
    if (direction === Direction.WEST) {
        self.texture = self.attackWest[(Math.floor(Date.now() / 150) % 4)];
    } else {
        self.texture = self.attackEast[(Math.floor(Date.now() / 150) % 4)];
    }
}

const idle = (self: Player, direction: Direction) => {
    self.velocityX = 0;
    if (direction === Direction.WEST) {
        self.texture = self.idleWest[(Math.floor(Date.now() / 150) % 4)];
    } else {
        self.texture = self.idleEast[(Math.floor(Date.now() / 150) % 4)];
    }
}

const applyGravity = (self: Player) => {
    const collision = self.currentColumn.detectVerticalCollision(self);
    if (collision.bottom) {
        self.velocityY = 0;
        self.y = self.y + collision.yRemainder;
    } else {
        if (self.velocityY < 9) {
            self.velocityY = self.velocityY + 3;
        }
        self.y = self.y + self.velocityY;
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

