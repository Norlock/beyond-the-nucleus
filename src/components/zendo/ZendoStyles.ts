import * as PIXI from 'pixi.js';
import { pixiResources } from 'src/pixi/PixiApp';

export const paragraphStyle = (wordWrapWidth: number): PIXI.TextStyle => {
    return new PIXI.TextStyle({
        fontSize: 25,
        fontFamily: 'Monaco',
        fill: ['#DDDDDD'],
        stroke: '#000',
        strokeThickness: 3,
        dropShadow: true,
        dropShadowColor: '#000000',
        dropShadowBlur: 4,
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 4,
        wordWrap: true,
        wordWrapWidth
    });
};

export const headerStyle = (): PIXI.TextStyle => {
    return new PIXI.TextStyle({
        fontSize: 35,
        //fontStyle: "bold",
        fontFamily: 'Monaco',
        fill: ['#779955'],
        stroke: '#000',
        strokeThickness: 3,
        dropShadow: true,
        dropShadowColor: '#000000',
        dropShadowBlur: 4,
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 4,
        align: 'center',
        lineJoin: 'round'
    });
};

export const zendoCardImage = (width: number, height: number): PIXI.Texture => {
    //Clone otherwise the same texture is randomised.
    const clone = pixiResources.zendoCard.clone()
    clone.frame.x = Math.random() * (clone.frame.width - width);
    clone.frame.y = clone.frame.height - height;
    clone.updateUvs()
    return clone
}

export const BEZIER_COLOR = 0x000000;
