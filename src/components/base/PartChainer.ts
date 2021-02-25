import { PartChain } from "./PartChain";

export const PartChainer = (root: PartChain, loadInAdvance: number) => {
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


    const load = (currentIndex: number) => {
        const difference = lastPartChain.index - currentIndex;
        if (difference < loadInAdvance && 0 < lastPartChain.nextParts.length) {
            initRecursively(lastPartChain.nextParts[0], loadInAdvance - difference);
        }
    }

    initRecursively(root, loadInAdvance);

    return {
        load
    };
}
