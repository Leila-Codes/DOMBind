import {NewController} from "./controller";
import {Directive} from "./directives/abstract.directives";

export class VisibilityDirective extends Directive {
    constructor() {
        super("[bind-show]");
    }

    render(ctrl: NewController, dataOverride?: any) {
        const attr = this.target.getAttribute(this.attr);

        if (attr) {
            const conditional = ctrl.get(attr);

            if (conditional) {
                this.target.style.visibility = "";
            } else {
                this.target.style.visibility = "hidden";
            }
        }
    }
}


