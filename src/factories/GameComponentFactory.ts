import { ChapterType } from 'src/chapters/base/ChapterType'
import { GameComponent } from 'src/components/base/GameComponent'
import { GameLoader } from 'src/modules/game/GameLoader'
import { MergeDefaultGameLoader } from 'src/modules/game/MergeDefaultGameLoader'
import { MergePixiFlowCard } from 'src/modules/pixi/MergeFlowPixi'
import { PixiParams } from 'src/modules/pixi/Pixi'
import { MergeGameComponentSelector } from 'src/modules/selector/MergeGameComponentSelector'

export class GameComponentFactory {
    readonly component: GameComponent

    constructor(chapterId: ChapterType, tag: string, pixiParams: PixiParams) {
        this.component = new GameComponent(tag, chapterId)

        MergeGameComponentSelector(this.component)
        MergeDefaultGameLoader(this.component)
        MergePixiFlowCard(this.component, pixiParams.containerName, pixiParams.card)
    }

    mergeGameLoader(custom: GameLoader) {
        this.component.game.append(custom)
        return this
    }

    // Todo maak functie en dit
    //mergeResourceHandler
}
