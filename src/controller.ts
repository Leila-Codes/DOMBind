import {Level, Logger} from "./logging";
import {DIRECTIVES} from "./directive";

export class Controller {
    name: string
    protected readonly data: any

    constructor(name: string, data?: any) {
        this.name = name;

        if (data != undefined)
            this.data = data;
    }

    instantiate(): ControllerInstance {
        return new ControllerInstance(this.name, this.data);
    }
}

export class ControllerInstance extends Controller {
    scope: any

    private target: HTMLElement | undefined
    private logger: Logger

    private bindings: Map<string, Set<HTMLElement>> = new Map();

    constructor(name: string, data?: any) {
        super(name, data);

        let ctrl = this;

        this.logger = new Logger(`Bindy-Controller-${this.name}`, Level.INFO);

        if (name)
            this.name = name


        this.scope = data || {};
    }

    get(expression: string, target?: string): any {
        if (!target)
            target = this.data;

        try {
            if (expression)
                return eval(`target.${expression}`);
            else
                return target;
        } catch (ex) {
            this.logger.log(Level.ERROR, "failed to fetch property", expression, "from", target);
        }

    }

    update(expression: string, value: any, target?: any): boolean {

        if (!target)
            target = this.data

        try {
            eval(`target.${expression} = value`);

            this.logger.log(Level.VERBOSE, "updated property", expression, "set to", value);

            if (this.bindings.has(expression)) {
                this.bindings.get(expression)?.forEach((e) => {
                    this.render(<HTMLElement>e.parentNode);
                })
            }

            return true;
        } catch (ex) {
            this.logger.log(Level.ERROR, "failed to update property", expression);

            return false;
        }
    }

    bind(target: HTMLElement) {
        this.target = target;

        this.render();
    }

    render(target?: HTMLElement, dataOverride?: any) {
        const ctrl = this;

        if (!target)
            target = this.target;

        DIRECTIVES.forEach((d) => {
            const els = target?.querySelectorAll(d.selector);

            this.logger.log(Level.VERBOSE, "processing directive", d.selector, "on", els);

            if (els)
                els.forEach((e) => {

                    const expression = d.render(ctrl, <HTMLElement>e, dataOverride);

                    if (expression) {
                        if (!this.bindings.has(expression))
                            this.bindings.set(expression, new Set<HTMLElement>());

                        // @ts-ignore
                        this.bindings.get(expression).add(<HTMLElement>e);
                    }
                });
        })
    }

    private parseEl(template: string): HTMLElement {
        const el = document.createElement('div');
        el.innerHTML = template;
        return el;
    }

    private evaluate(expression: string, data?: any): any {
        const parts = expression.split(".");
        let value: any = data || this.scope;
        for (let part of parts) {
            if (part === '')
                continue;
            value = value[part];

        }

        return value;
    }
}
