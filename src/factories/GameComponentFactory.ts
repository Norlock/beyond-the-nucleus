import { Chapter } from 'src/chapters/base/Chapter'
import { GameComponent } from 'src/components/base/GameComponent'
import { GameLoader } from 'src/modules/game/GameLoader'
import { MergeDefaultGameLoader } from 'src/modules/game/MergeDefaultGameLoader'
import { MergePixiFlowCard } from 'src/modules/pixi/MergeFlowPixi'
import { PixiSelector } from 'src/modules/pixi/Pixi'
import { MergeGameComponentSelector } from 'src/modules/selector/MergeGameComponentSelector'

export class GameComponentFactory {
    readonly component: GameComponent

    constructor(chapter: Chapter, tag: string) {
        this.component = new GameComponent(chapter)
        this.component.tag = tag

        MergeGameComponentSelector(this.component)
        MergeDefaultGameLoader(this.component)
    }

    mergePixiCard(containerName: string, card: PixiSelector): GameComponentFactory {
        MergePixiFlowCard(this.component, containerName, card)
        return this
    }

    mergeGameLoader(custom: GameLoader) {
        this.component.game.append(custom)
        return this
    }
}
