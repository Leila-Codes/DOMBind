import { Controller} from "../controller";
import {Directive} from "./abstract.directives";

export class ClickableDirective extends Directive {
    constructor(target?: HTMLElement) {
        super("[bind-click]", target);
    }

    render(ctrl: Controller, dataOverride?: any) {
        if (this.expression) {
            const matches = Array.from(this.expression.matchAll(/[\w\.]+/g));

            const funcName = matches[0][0],
                args = matches.slice(1).map(i => i[0]);

            let cb: Function;
            if (funcName === "update")
                cb = ctrl.update
            else
                cb = ctrl.resolve(funcName, dataOverride);

            if (typeof cb === "function") {
                this.target.onclick = function(e) {
                    const argVals = args.map(a => ctrl.resolve(a, dataOverride));

                    cb.apply(ctrl, argVals);
                }
            }
        }
    }
}
