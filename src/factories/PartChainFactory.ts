import { ChapterType } from "src/chapters/base/ChapterType";
import { PartChain } from "src/components/base/PartChain";
import { TestFlags } from "src/components/base/PartTester";
import {MergePartChainFlowLoader} from "src/modules/partChain/MergePartChainFlowLoader";
import {MergePartChainGameLoader} from "src/modules/partChain/MergePartChainGameLoader";
import {AttachPreviousFunction, BuildFunction, LoaderType} from "src/modules/partChain/PartLoader";

type PartCreator = (part: PartChain) => PartChain;


export const PartChainFactory = (tag: string, chapterType: ChapterType, previous: PartChain) => {
    const self = new PartChain(tag, chapterType, previous);

    const mergeLoader = (loaderType: LoaderType, buildComponentFunction: BuildFunction, attachPreviousComponentFunction: AttachPreviousFunction) => {
        if (loaderType === LoaderType.FLOW) {
            MergePartChainFlowLoader(self, buildComponentFunction, attachPreviousComponentFunction);
        } else {
            MergePartChainGameLoader(self, buildComponentFunction, attachPreviousComponentFunction);
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
