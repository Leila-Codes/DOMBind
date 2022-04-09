export enum Level {
    ERROR,
    WARNING,
    INFO,
    VERBOSE
}

export class Logger {
    name: string
    level: Level = Level.INFO

    constructor(name: string, level: Level = Level.VERBOSE) {
        this.name = name;
        if (level)
            this.level = level;
    }

    public log(level: Level = Level.INFO, ...message: any[]): void {
        if (level <= this.level) {
            // const stack = new Error().stack?.split("\n")[1];
            const msg = [
                new Date().toLocaleTimeString(),
                `[${Level[level].toLowerCase()}]`,
                this.name,
                ""
            ].join("\t|  ");

            switch (level) {
                case Level.INFO:
                    console.info(msg, ...message);
                    break;
                case Level.WARNING:
                    console.warn(msg, ...message);
                    break
                case Level.VERBOSE:
                    console.debug(msg, ...message);
                    break;
                case Level.ERROR:
                default:
                    console.error(msg, ...message);
                    break;
            }

        }
    }
}
