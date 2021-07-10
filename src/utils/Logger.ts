import { PartChain } from 'src/components/base/PartChain'

const collision = String.fromCodePoint(0x1f310)
const stacktrace = String.fromCodePoint(0x1f6e4)
const scientist = String.fromCodePoint(0x1f469)
const frog = String.fromCodePoint(0x1f438)

// Maybe in the future send to a backend to analyse.
const log = (tag: string, ...args: any) => {
    console.group(
        `%c ${tag}\t ${collision} `,
        'color: #B2FFFF; font-size: 14px; background-color: #111; font-weight: bold; padding: 5px; border-radius: 5px;'
    )
    console.log(args)
    console.groupEnd()
}

const trace = () => {
    console.trace(
        `%c ${scientist} Stacktrace ${stacktrace} `,
        'color: #fff44f; font-size: 14px; background-color: #111; font-weight: bold; padding: 5px; border-radius: 5px;'
    )
}

const error = (tag: string, ...data: any) => {
    console.error(
        `%c ${frog} ${tag} `,
        'color: black; font-size: 14px; background-color: #B23A38; font-weight: bold; padding: 5px; border-radius: 5px;',
        data
    )
}

const debugChain = (part: PartChain): void => {
    const previousParts = (current: PartChain): PartChain[] => {
        const list: PartChain[] = []
        while (current.previous) {
            list.push(current.previous)
            current = current.previous
        }
        return list
    }

    const nextParts = (current: PartChain, list: PartChain[][]): PartChain[][] => {
        if (current.nextParts.length > 0) {
            list.push(current.nextParts)

            for (let next of current.nextParts) {
                nextParts(next, list)
            }
        }

        return list
    }

    LOG.log('Previous', previousParts(part))
    LOG.log('Current', self)
    LOG.log('Next', nextParts(part, []))
}

export const LOG = {
    log,
    trace,
    error,
    debugChain
}
