const collision = String.fromCodePoint(0x1f310);
const stacktrace = String.fromCodePoint(0x1f6e4);
const scientist = String.fromCodePoint(0x1f469);
const frog = String.fromCodePoint(0x1f438);

class Log {
    log(tag: string, ...args: any[]) {
        console.group(
            `%c ${tag}\t ${collision} `,
            'color: #B2FFFF; font-size: 14px; background-color: #111; font-weight: bold; padding: 5px; border-radius: 5px;'
        );
        console.log(args);
        console.groupEnd();
    }

    trace() {
        console.trace(
            `%c ${scientist} Stacktrace ${stacktrace} `,
            'color: #fff44f; font-size: 14px; background-color: #111; font-weight: bold; padding: 5px; border-radius: 5px;'
        );
    }

    error(tag: string, ...data: any[]) {
        console.error(
            `%c ${frog} ${tag} `,
            'color: black; font-size: 14px; background-color: #B23A38; font-weight: bold; padding: 5px; border-radius: 5px;',
            data
        );
    }
}

const LOG = new Log();
export { LOG };
