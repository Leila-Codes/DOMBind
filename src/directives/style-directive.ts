import {Directive} from "./abstract.directives";
import {Controller} from "../controller";

import { parseProperties } from "./class-directive";

export class StyleDirective extends Directive {
    private props = new Map();

    constructor(target?: HTMLElement) {
        super("[bind-style]", target);

        if (this.expression.startsWith("{")) {
            this.props = parseProperties(this.expression);
        }
    }

    bindings(): string[] {
        return [...this.props.values()];
    }

    render(ctrl: Controller, dataOverride?: any): string | void {
        if (this.props.size > 0) {
            this.props.forEach((expression, stylePropName) => {
                const ctrlValue = ctrl.resolve(expression);

                if (ctrlValue)
                    this.target.style[stylePropName] = ctrlValue;
            });
            // for (let prop of this.props.keys()) {
            //     const expression = this.props.get(prop),
            //         value = ctrl.resolve(expression);
            //
            //     if (value) {
            //         // @ts-ignore
            //         this.target.style[prop] = value;
            //     }
            // }
        }

    }
}
