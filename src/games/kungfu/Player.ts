import * as PIXI from 'pixi.js';
import {GameComponent} from "src/components/base/GameComponent";
import {connectInputHandler} from 'src/modules/inputHandler/ConnectInputHandler';
import {InputHandler} from "src/modules/inputHandler/InputHandler";
import {Collision} from './Collision';
import {Column} from './Column';
import {Direction, MovementSprite} from './MovementSprite';

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

    jumpEast: PIXI.Texture;
    jumpWest: PIXI.Texture;

    private constructor(component: GameComponent, x: number, y: number) {
        super(component, x, y); 
        this.velocityY = 0;
        this.velocityX = 0;
        this.scale.set(2);
    }

    static create = (component: GameComponent, x: number, y: number): Player => {
        const self = new Player(component, x, y);
        self.currentColumn = component.resourceHandler.characterGrid.getColumn(x);
        self.direction = Direction.EAST;

        component.game.app.stage.y += 200;

        component.inputHandler = inputHandler(self, component);
        connectInputHandler(component.inputHandler);
        initResources(self, component);
        return self;
    }
}

const inputHandler = (self: Player, component: GameComponent): InputHandler => {
    let isKeyDown: boolean;
    let keyPressed: string;

    const { stage } = component.game.app;

    const scroll = (): void => {
        const collision = 0 <= self.velocityY ? fall(self, stage) : jump(self, stage);
        component.game.app.render();

        if (isKeyDown) {
            switch (keyPressed) {
                case 'a':
                    if (collision.bottom) { // No left/right movement allowed when in air
                        self.direction = Direction.WEST;
                        moveLeft(self, stage);
                    }
                break;
                case 'd':
                    if (collision.bottom) { // No left/right movement allowed when in air
                        self.direction = Direction.EAST;
                        moveRight(self, stage);
                    }
                break;
                case 'w':
                    if (collision.bottom) { // Only jump if on ground
                        if (self.direction === Direction.EAST)
                            self.texture =  self.jumpEast;
                        else
                            self.texture = self.jumpWest;
                        moveTop(self, stage);
                    }
                break;
                case 's':
                    moveBottom(self, stage);
                break;
                case ' ':
                    attack(self);
                break;
            }
        } else if (collision.bottom) {
            idle(self);
        }
    };

    component.game.app.ticker.add(scroll);

    const keyUp = (event: KeyboardEvent): void => {
        isKeyDown = false;
    }

    const keyDown = (event: KeyboardEvent): void => {
        isKeyDown = true;
        //console.log('keypress', event.key);

        //if (event.key 
    }

    const keyPress = (event: KeyboardEvent): void => {
        keyPressed = event.key;

        if (event.key === "\\") {
            const { devContainer } = component.resourceHandler;
            devContainer.visible = !devContainer.visible;
            component.game.app.render();
        } else if (event.key === "Escape") {
            component.game.cleanup();
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
    updateHorizontal(self, stage, collision);
}

const moveRight = (self: Player, stage: PIXI.Container) => {
    self.texture = self.walkEast[(Math.floor(Date.now() / 150) % 4)];

    if (self.velocityX < 0) 
        self.velocityX = 0;
    
    if (self.velocityX < 9) 
        self.velocityX += 3;

    const collision = self.currentColumn.detectRightCollision(self);
    updateHorizontal(self, stage, collision);
}

const updateHorizontal = (self: Player, stage: PIXI.Container, collision: Collision) => {
    if (collision.left || collision.right) {
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
    const ladder = false;
    if (ladder) {
        self.texture = self.walkNorth[(Math.floor(Date.now() / 150) % 4)];
    } else {
        self.velocityY = -18;
    }
}

const moveBottom = (self: Player, stage: PIXI.Container) => {
    // Jump / todo ladder descending
    //self.y += 10;
    //stage.y -= 10;
    self.texture = self.walkSouth[(Math.floor(Date.now() / 150) % 4)];
}

const attack = (self: Player) => {
    if (self.direction === Direction.WEST) {
        self.texture = self.attackWest[(Math.floor(Date.now() / 150) % 4)];
    } else {
        self.texture = self.attackEast[(Math.floor(Date.now() / 150) % 4)];
    }
}

const idle = (self: Player) => {
    self.velocityX = 0;
    if (self.direction === Direction.WEST) {
        self.texture = self.idleWest[(Math.floor(Date.now() / 150) % 4)];
    } else {
        self.texture = self.idleEast[(Math.floor(Date.now() / 150) % 4)];
    }
}

const fall = (self: Player, stage: PIXI.Container) => {
    if (self.velocityY < 9) 
        self.velocityY += 3;

    const collision = self.currentColumn.detectBottomCollision(self);
    if (collision.bottom) {
        self.velocityY = 0;
        self.y += collision.yRemainder;
        stage.y -= collision.yRemainder;
        if (0 < collision.yRemainder)
            updateHorizontalInAir(self, stage);
    } else {
        self.y += self.velocityY;
        stage.y -= self.velocityY;

        updateHorizontalInAir(self, stage);
    }
    
    return collision;
}

const jump = (self: Player, stage: PIXI.Container) => {
    // TODO -3 etc as variable
    if (self.velocityY <= -3) 
        self.velocityY += 3;

    updateHorizontalInAir(self, stage);

    const collision = self.currentColumn.detectTopCollision(self);
    if (collision.top) {
        self.velocityY = 0;
        self.y += collision.yRemainder;
        stage.y -= collision.yRemainder;
    } else {
        self.y += self.velocityY;
        stage.y -= self.velocityY;
    }

    return collision;
}

const updateHorizontalInAir = (self: Player, stage: PIXI.Container) => {
    if (0 < self.velocityX) {
        const collision = self.currentColumn.detectRightCollision(self);
        updateHorizontal(self, stage, collision);
        self.velocityX--;
    } else if (self.velocityX < 0) {
        const collision = self.currentColumn.detectLeftCollision(self);
        updateHorizontal(self, stage, collision);
        self.velocityX++;
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

    self.walkNorth.push(new PIXI.Texture(resources.walkNorth.texture.baseTexture, 
                                           new PIXI.Rectangle(0, 0, 16, 24)));
    self.walkNorth.push(new PIXI.Texture(resources.walkNorth.texture.baseTexture, 
                                           new PIXI.Rectangle(16, 0, 16, 24)));
    self.walkNorth.push(new PIXI.Texture(resources.walkNorth.texture.baseTexture, 
                                           new PIXI.Rectangle(32, 0, 16, 24)));
    self.walkNorth.push(new PIXI.Texture(resources.walkNorth.texture.baseTexture, 
                                           new PIXI.Rectangle(48, 0, 16, 24)));

    self.walkSouth.push(new PIXI.Texture(resources.walkSouth.texture.baseTexture, 
                                           new PIXI.Rectangle(0, 0, 16, 24)));
    self.walkSouth.push(new PIXI.Texture(resources.walkSouth.texture.baseTexture, 
                                           new PIXI.Rectangle(16, 0, 16, 24)));
    self.walkSouth.push(new PIXI.Texture(resources.walkSouth.texture.baseTexture, 
                                           new PIXI.Rectangle(32, 0, 16, 24)));
    self.walkSouth.push(new PIXI.Texture(resources.walkSouth.texture.baseTexture, 
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

    self.jumpEast = new PIXI.Texture(resources.jumpEast.texture.baseTexture);
    self.jumpWest = new PIXI.Texture(resources.jumpWest.texture.baseTexture);
    self.texture = self.idleWest[(Math.floor(Date.now() / 150) % 4)];
}

