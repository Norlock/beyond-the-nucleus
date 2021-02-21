import * as PIXI from 'pixi.js';

export const getBackground4 = (): PIXI.Container => {
    const size = 10000;
    const container = new PIXI.Container();
    container.x = -6000;
    container.y = 8000;
    container.width = size;
    container.height = size;

    const gradTexture = createGradTexture();

    const sprite = new PIXI.Sprite(gradTexture);
    sprite.position.set(size, 0);
    sprite.angle = 90;
    sprite.width = size;
    sprite.height = size;
    container.addChild(sprite);

    return container;
};

const createGradTexture = () => {
    // adjust it if somehow you need better quality for very very big images
    const quality = 512;
    const canvas = document.createElement('canvas');
    canvas.width = quality;
    canvas.height = 1;

    const ctx = canvas.getContext('2d');

    // use canvas2d API to create gradient
    const grd = ctx.createLinearGradient(0, 0, quality, 0);
    grd.addColorStop(0, '#3366dd');
    grd.addColorStop(0.1, 'blue');
    grd.addColorStop(0.3, 'darkblue');
    grd.addColorStop(1, 'black');

    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, quality, 1);

    return PIXI.Texture.from(canvas);
};
