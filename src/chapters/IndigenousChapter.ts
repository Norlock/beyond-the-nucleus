import { ChapterFactory } from 'src/factories/ChapterFactory'
import { Chapter } from './base/Chapter'
import { ChapterType } from './base/ChapterType'

export enum Indigenous {
    MAP = 'map'
}

export const IndigenousChapter = (): Chapter => {
    const factory = ChapterFactory(ChapterType.INDIGENOUS, 0, 0)

    //factory.chapter.selector.append(chapterSelector(factory.chapter))
    return factory.chapter
}

//const background1 = (): ContainerData => {
//const container = new PIXI.Container();
//const imageWidth = 3210;
//const imageHeight = 2042;
//const background = new PIXI.Sprite(pixiResources.oceanStart);

//background.width = imageWidth;
//background.height = imageHeight;

//container.addChild(background);

//const select = (): void => {
//setTimeout(() => {
//}, 200);
//};

//const unselect = (): void => {
//};

//return {
//container,
//name: NativeName.MAP,
//selector: {
//select,
//unselect
//}
//}
//};
