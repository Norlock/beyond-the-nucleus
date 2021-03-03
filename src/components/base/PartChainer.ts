import { PartChain } from "./PartChain";

export const PartChainer = (root: PartChain, loadCount: number) => {
    let lastPartChain: PartChain;

    // Initialises the chain
    const initRecursively = (part: PartChain, index: number) => {
        lastPartChain = part;
        part.init();

        if (part.isSuccessful) {
            index--;
        }

        if (index === 0) {
            return;
        }

        part.nextParts.forEach(next => {
            initRecursively(next, index);
        });
    }

    const initRecursivelyBackward = (part: PartChain, index: number) => {
        if (!part.initialized) {
            part.init();
        } 

        if (part.isSuccessful) {
            index--;
        }

        if (part.previous) {
            initRecursivelyBackward(part.previous, index); 
        }
    }

    const load = (currentIndex: number) => {
        const difference = lastPartChain.index - currentIndex;
        if (difference < loadCount && 0 < lastPartChain.nextParts.length) {
            initRecursively(lastPartChain.nextParts[0], loadCount - difference);
        }
    }

    initRecursively(root, loadCount);

    return {
        load
    };
}
