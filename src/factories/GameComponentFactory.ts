import { ChapterType } from 'src/chapters/base/ChapterType'
import { GameComponent } from 'src/components/base/GameComponent'
import { GameLoader } from 'src/modules/game/GameLoader'
import { MergeDefaultGameLoader } from 'src/modules/game/MergeDefaultGameLoader'
import { MergePixiFlowCard } from 'src/modules/pixi/MergeFlowPixi'
import { PixiParams } from 'src/modules/pixi/Pixi'
import { MergeGameComponentSelector } from 'src/modules/selector/MergeGameComponentSelector'

export const GameComponentFactory = (id: string, chapterId: ChapterType, pixiParams: PixiParams) => {
    const component = new GameComponent(id, chapterId)

    MergeGameComponentSelector(component)
    MergeDefaultGameLoader(component)
    MergePixiFlowCard(component, pixiParams.containerName, pixiParams.card)

    function mergeGameLoader(custom: GameLoader) {
        this.component.game.append(custom)
        return { component }
    }

    return { mergeGameLoader, component }
}
