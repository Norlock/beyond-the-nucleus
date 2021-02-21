import { PartChain } from "./PartChain";

export const PartChainer = (root: PartChain): PartChain => {

    // Initialises the chain
    const initRecursively = (part: PartChain) => {
        part.init();

        part.nextParts.forEach(next => {
            initRecursively(next);
        });
    }

    initRecursively(root);

    return root;
}
