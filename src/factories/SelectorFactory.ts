import { Select, Selector, Unselect } from 'src/modules/selector/Selector'

export const SelectorFactory = (self: Selector) => {
    const setSelect = (value: Select) => {
        self.select = value
        return factory
    }

    const setUnselect = (value: Unselect) => {
        self.unselect = value
        return factory
    }

    const build = (): Selector => {
        return self
    }

    const factory = {
        setSelect,
        setUnselect,
        build
    }

    return factory
}
