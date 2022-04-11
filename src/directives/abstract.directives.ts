import {NewController} from "../controller";

export abstract class Directive {
    readonly selector: string = "bind-attr";

    protected attr: string
    protected expression: string = ""

    protected target!: HTMLElement;
    protected template!: HTMLElement;

    protected constructor(selector: string, target?: HTMLElement) {
        this.selector = selector;
        let matches = selector.match(/\[([\w\-]+)\]/);

        // @ts-ignore
        this.attr = matches[1];

        if (target) {
            this.expression = target.getAttribute(this.attr) || "";

            // this.template = new DocumentFragment();
            this.target = target;

            this.template = document.createElement(target.tagName);
            this.template.innerHTML = target.innerHTML;
            this.template.className = target.className;
            // this.target.className = "";

            // const parser = new DOMParser();
            // this.template = parser.parseFromString(target.outerHTML, 'text/html');
        }
    }

    render(ctrl: NewController, dataOverride?: any): string | void {
        // Do nothing.
    }
}

export class StrBindDirective extends Directive {
    // selector = ;
    constructor(target?: HTMLElement) {
        super("[bind-str]", target);
    }

    render(ctrl: NewController, data?: any) {
        // const attr = target.getAttribute(this.attr);

        this.target.textContent = ctrl.get(this.expression, data);
        if (this.expression)
            return this.expression
    }
}
