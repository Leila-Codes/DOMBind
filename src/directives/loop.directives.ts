import { NewController} from "../controller";
import {Directive} from "./abstract.directives";

export class ForLoopDirective extends Directive {
    constructor(target?: HTMLElement) {
        super("[bind-for]", target);
    }

    render(ctrl: NewController, data?: any) {
        const output = document.createDocumentFragment();

        const arr = ctrl.get(this.expression, data);
        // const arr = evaluate(attr, data);
        if (Array.isArray(arr)) {
            this.target.appendChild(document.createComment(`for ${this.expression} in ${this.expression}`));

            arr.forEach((item: any) => {
                // output.appendChild(this.template.cloneNode(true));

                const itemEl = this.template.cloneNode(true);
                // @ts-ignore
                // this.target.appendChild(itemEl);
                output.append(itemEl);

                const itemCtrl = new NewController(item);
                itemCtrl.compile(itemEl as HTMLElement);

            });

            this.target.className = "";
            this.target.innerHTML = '';
            this.target.replaceChildren(output);

        }
        // return attr;
    }
}
