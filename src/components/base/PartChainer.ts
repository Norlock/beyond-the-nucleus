import { LOG } from "src/utils/Logger";
import { OceanPart1 } from "../ocean/OceanPart1";
import { PartChain } from "./PartChain";

const LOAD_COUNT = 4;

export const PartChainer = () => {
    const head: PartChain = OceanPart1();
    let initializedPartTail: PartChain;
    let initializedPartHead: PartChain;

    // Initialises the chain
    const initRecursively = (part: PartChain, remainCount: number) => {
        part.init();
        part.attachPrevious();

        if (part.isSuccessful) {
            remainCount--;
        }

        if (remainCount > 0 && part.hasNext) {
            part.nextParts.forEach(next => {
                initRecursively(next, remainCount);
            });
        } else {
            initializedPartTail = part;
        }
    }

    const initRecursivelyBackwards = (part: PartChain, remainCount: number) => {
        if (remainCount > 0 && part.hasPrevious) {
            remainCount--;
            initRecursivelyBackwards(part.previous, remainCount)
        } else {
            initializedPartHead = part;
        }

        part.init();
        part.attachPrevious();
    }

    const load = (currentIndex: number) => {
        const remainTail = initializedPartTail.index - currentIndex;
        const remainHead = currentIndex - initializedPartHead.index;
        
        if (remainHead < LOAD_COUNT && initializedPartHead.hasPrevious) {
            // if current = 5, tail = 6,  remainer = 1, so need to load 4.
            initRecursivelyBackwards(initializedPartHead, LOAD_COUNT - remainHead);
        }

        if (remainTail < LOAD_COUNT && initializedPartTail.hasNext) {
            // if current = 6, head = 5, remainer = 1, so need to load 4.
            initRecursively(initializedPartTail, LOAD_COUNT - remainTail);
        }
    }

    const init = (tag: string, part: PartChain): PartChain => {
        if (part.tag === tag) {
            LOG.debugChain(part);
            initRecursivelyBackwards(part, LOAD_COUNT);
            initRecursively(part, LOAD_COUNT);
            return part;
        }

        for (let node of part.nextParts) {
            return init(tag, node);
        }
    }

    return {
        load,
        init: (tag: string) => init(tag, head),
    };
}
