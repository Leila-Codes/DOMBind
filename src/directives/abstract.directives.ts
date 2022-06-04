import {Controller} from "../controller";

export abstract class Directive {
    readonly selector: string = "bind-attr";

    protected attr: string
    public expression: string = ""

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

    bindings() : string[] {
        return [this.expression];
    }

    render(ctrl: Controller, dataOverride?: any): void {
        // Do nothing.
    }
}

export class StrBindDirective extends Directive {
    // selector = ;
    constructor(target?: HTMLElement) {
        super("[bind-str]", target);
    }

    render(ctrl: Controller, dataOverride?: any) {
        // const attr = target.getAttribute(this.attr);

        this.target.textContent = ctrl.resolve(this.expression, dataOverride);
    }
}

export class VisibilityDirective extends Directive {
    private readonly prevDisplay?: string;

    constructor(target?: HTMLElement) {
        super("[bind-if]", target);
        this.prevDisplay = this.target?.style.display;
    }

    render(ctrl: Controller, dataOverride?: any): string | void {
        const currValue = ctrl.resolve(this.expression, dataOverride);

        if (currValue) {
            // this.target.style.visibility = "block";
            this.target.style.display = this.prevDisplay || "block";
        } else {
            // this.target.style.visibility = "none";
            this.target.style.display = "none";
        }
    }
}
