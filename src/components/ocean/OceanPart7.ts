import { Chapter } from 'src/chapters/base/Chapter';
import { FlowComponent } from '../base/FlowComponent';

export const setOceanPart7 = (chapter: Chapter, previous: FlowComponent): FlowComponent => {
    //const background: CardOptions = {
        //color: 0x000023,
        //borderColor: 0x000000,
        //alpha: 1,
        //x: 100,
        //y: 100,
        //width: 530,
        //height: 180,
        //pivotCenter: false
    //};

    //const scrollOffset: Offset = {
        //x: 100,
        //y: 100
    //};

    //const headerStyle = new PIXI.TextStyle({
        //fontSize: 33,
        //fontStyle: 'bold',
        //fill: ['#88BBEE'], // gradient
        //align: 'center',
        //wordWrap: true,
        //wordWrapWidth: background.width,
        //lineJoin: 'round'
    //});

    //const header = new PIXI.Text('The rainforests of the sea', headerStyle);
    //header.x = background.width / 2;
    //header.y = 40;
    //header.anchor.set(0.5);

    //const paragraghStyle = new PIXI.TextStyle({
        //fontSize: 25,
        //fill: ['#FFFFFF'], // gradient
        //dropShadow: true,
        //dropShadowColor: '#000000',
        //dropShadowBlur: 2,
        //dropShadowAngle: Math.PI / 6,
        //dropShadowDistance: 2,
        //wordWrap: true,
        //wordWrapWidth: background.width - 40,
        //lineJoin: 'round'
    //});

    //const paragraphText = 'Coral reefs are the largest structures on earth of biological origin.';
    //const paragraph = new PIXI.Text(paragraphText, paragraghStyle);
    //paragraph.x = 20;
    //paragraph.y = 75;

    //const components = PixiFactory(cardOptions, chapter.getContainer(OceanName.OCEAN))
        //.setColorCard()
        //.addChild(header, paragraph)
        //.setOffset(100, 100)
        //.setBezier(previous)
        //.build();

    //const factory = FlowComponentFactory(chapter, 'ocean6')
        //.mergeMover(previous)
        //.mergePixi(components);

    //const factory = FlowComponentFactory(chapter, 'ocean7');
    //factory.mergeMover(previous);
    //factory.mergePixi(chapter.getContainer(OceanName.OCEAN), pixiCard(pixiAttrs), scrollOffset);
    //return factory.component;
    return previous;
};
