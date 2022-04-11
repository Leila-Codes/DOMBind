import { NewController} from "../controller";
import {Directive} from "./abstract.directives";

export class InputModelDirective extends Directive {
    target!: HTMLInputElement

    constructor(target?: HTMLInputElement) {
        super("input[bind-model]", target);

        if (target)
            this.target = target;
    }

    render(ctrl: NewController, dataOverride?: any) {
        // Configure the current value
        const attr = this.target.getAttribute(this.attr);

        if (attr) {
            // const currValue = evaluate(attr, data);

            // Assign current value
            this.target.value = ctrl.get(attr, dataOverride);

            // Set-up event handlers
            this.target.oninput = function (e) {
                if (!e.target)
                    return;

                const updatedElem = <HTMLInputElement>(e.target),
                    newValue = updatedElem.value;

                ctrl.update(attr, newValue, dataOverride);
            }
        }

    }
}
