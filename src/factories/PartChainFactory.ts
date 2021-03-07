import { ChapterProvider } from "src/chapters/base/ChapterProvider";
import { ChapterType } from "src/chapters/base/ChapterType";
import { FlowComponent } from "src/components/base/FlowComponent";
import { PartChain } from "src/components/base/PartChain";
import { TestFlags } from "src/components/base/PartTester";
import { FlowComponentFactory } from "./FlowComponentFactory";

type BuildComponent = (factory: FlowComponentFactory) => FlowComponent;
type AttachPreviousComponent = (factory: FlowComponentFactory, previous: FlowComponent) => void;

export const PartChainFactory = (tag: string, chapterType: ChapterType, previous: PartChain) => {
    const partChain = new PartChain(tag, chapterType, previous);
    const chapter = ChapterProvider.get(chapterType);
    const flowFactory = new FlowComponentFactory(chapter, tag)
            .mergeMover(partChain.index);

    const setBuildComponent = (func: BuildComponent) => {
        partChain.buildComponent = () => func(flowFactory);
        return factory;
    }

    const setAttachPreviousComponent = (func: AttachPreviousComponent) => {
        partChain.attachPreviousComponent = (previous: FlowComponent) => func(flowFactory, previous);
        return factory;
    }

    const setTestFlags = (flags: TestFlags) => {
        partChain.testFlags = flags;
        return factory;
    }

    const build = () => {
        return partChain;
    }

    const factory = {
        setBuildComponent,
        setAttachPreviousComponent,
        setTestFlags,
        build
    }

    return factory;
}
