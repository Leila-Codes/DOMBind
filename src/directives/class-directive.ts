import {Directive} from "./abstract.directives";
import {Controller} from "../controller";

export function parseProperties(expression: string): Map<string, string> {
    function sanitize(input: string, allowQuotes: boolean = false): string {
        let regexReplace = /[\'\"\{\}]/gm;

        if (allowQuotes)
            regexReplace = /[\{\}]/gm;

        return input.trim().replace(regexReplace, "");
    }

    const retVal = new Map(),
        expressions = expression.split(",");

    for (let pair of expressions) {
        const [key, val] = pair.split(":");
        retVal.set(
            sanitize(key),
            sanitize(val, true)
        );
    }

    return retVal;
}



export class ClassDirective extends Directive {
    private readonly props = new Map();

    constructor(target?: HTMLElement) {
        super("[bind-class]", target);

        if (this.expression) {
            if (this.expression.startsWith("{")) {
                this.props = parseProperties(this.expression);
            }
        }
    }

    bindings() {
        return [...this.props.values()];
    }

    render(ctrl: Controller, dataOverride?: any): string | void {
        if (this.props.size > 0) {
            this.props.forEach((expression, className) => {
                const ctrlValue = ctrl.resolve(expression);

                if (ctrlValue)
                    this.target.classList.add(className);
                else
                    this.target.classList.remove(className);
            })
        } else {
            this.target.className = ctrl.resolve(this.expression);
        }
    }
}
