import * as PIXI from 'pixi.js';

export const pixiApp = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    resizeTo: window,
    resolution: window.devicePixelRatio || 1,
    antialias: true
});

export let pixiResources: resourceNames;

interface resourceNames {
    oceanStart: PIXI.Texture;
    oceanTurtle: PIXI.Texture;
    oceanBubble: PIXI.Texture;
    oceanAnthozoa: PIXI.Texture;
    zendoCard: PIXI.Texture;
}

export const preload = (callback: Function) => {
    pixiApp.loader.baseUrl = 'src/assets';
    pixiApp.loader
        .add('oceanStart', 'ocean/ocean.jpg')
        .add('oceanTurtle', 'ocean/ocean-turtle.jpg')
        .add('oceanBubble', 'ocean/bubble.png')
        .add('oceanAnthozoa', 'ocean/Anthozoa.jpg')
        .add('zendoCard', 'zendo/card-background.jpg');

    pixiApp.loader.onError.add((err) => console.error(err));
    pixiApp.loader.load((loader, res) => {
        pixiResources = {
            oceanBubble: res.oceanBubble.texture,
            oceanStart: res.oceanStart.texture,
            oceanTurtle: res.oceanTurtle.texture,
            oceanAnthozoa: res.oceanAnthozoa.texture,
            zendoCard: res.zendoCard.texture
        };
        callback();
    });
};

export const isInViewport = (container: PIXI.Container): boolean => {
    const minX = container.x;
    const minY = container.y;
    const maxX = minX + container.width;
    const maxY = minY + container.height;

    return minX < pixiApp.stage.x && pixiApp.stage.x < maxX && minY < pixiApp.stage.y && pixiApp.stage.y < maxY;
};
