import { ChapterType } from "src/chapters/base/ChapterType";
import { PartChain } from "src/components/base/PartChain";
import { TestFlags } from "src/components/base/PartTester";
import {MergeFlowLoader} from "src/modules/partChain/MergeFlowLoader";
import {MergeGameLoader} from "src/modules/partChain/MergeGameLoader";
import {AttachPreviousFunction, BuildFunction, LoaderType} from "src/modules/partChain/PartLoader";

type PartCreator = (part: PartChain) => PartChain;


export const PartChainFactory = (tag: string, chapterType: ChapterType, previous: PartChain) => {
    const self = new PartChain(tag, chapterType, previous);

    const mergeLoader = (loaderType: LoaderType, buildComponentFunction: BuildFunction, attachPreviousComponentFunction: AttachPreviousFunction) => {

        if (loaderType === LoaderType.FLOW) {
            MergeFlowLoader(self, buildComponentFunction, attachPreviousComponentFunction);
        } else {
            MergeGameLoader(self, buildComponentFunction, attachPreviousComponentFunction);
        }

        return factory;
    }

    const setTestFlags = (flags: TestFlags) => {
        self.testFlags = flags;
        return factory;
    }

    const setNextParts = (...nextPartCreators: PartCreator[]) => {
        nextPartCreators.forEach(partCreator => {
            self.nextParts.push(partCreator(self))
        });

        return factory;
    }

    const build = () => {
        return self;
    }

    const factory = {
        mergeLoader,
        setTestFlags,
        setNextParts,
        build
    }

    return factory;
}
