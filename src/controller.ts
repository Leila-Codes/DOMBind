import {Level, Logger} from "./logging";
import { DIRECTIVES } from "./directives/directives";
import {Directive, /*DirectiveInstace, DirectiveInstance,*/ StrBindDirective} from "./directives/abstract.directives";
import {ForLoopDirective} from "./directives/loop.directives";
import {InputModelDirective} from "./directives/input.directives";
import {ClickableDirective} from "./directives/event.directives";

// export class Controller {
//     name: string
//     protected readonly data: any
//
//     constructor(name: string, data?: any) {
//         this.name = name;
//
//         if (data != undefined)
//             this.data = data;
//     }
//
//     instantiate(): ControllerInstance {
//         return new ControllerInstance(this.name, this.data);
//     }
// }

export class NewController extends Directive {
    // selector = "[bind-controller]"

    private scope: Map<string, Object> = new Map();
    private logger: Logger
    private bindings: Map<string, Directive[]> = new Map();

    constructor(data?: any) {
        super("[bind-controller]");

        this.scope = data;

        this.logger = new Logger(`Bindy-Controller`, Level.VERBOSE);
    }

    get(expression: string, target: any = this.scope): any {
        try {
            if (expression) {
                return eval(`target.${expression}`);
            }
        } catch (ex) {
            try {
                return eval(expression);
            } catch {
                this.logger.log(Level.ERROR, "failed to fetch property", expression, "from", target);
            }
        }
        return target;
    }

    compile(target: HTMLElement, ctrlOverride: NewController = this) {
        // super.compile(ctrl, target);
        // try {
        //     this.scope = eval(this.expression);
        // } catch (ex) {
        //     this.scope = new Map();
        // }

        DIRECTIVES.forEach((d: Directive) => {
            const els = target.querySelectorAll(d.selector);
            els.forEach(e => {
                if (e.nodeType === Node.ELEMENT_NODE) {
                    let instance;
                    if (d instanceof StrBindDirective) {
                        instance = new StrBindDirective(e as HTMLElement);
                    } else if (d instanceof ForLoopDirective) {
                        instance = new ForLoopDirective(e as HTMLElement);
                    } else if (d instanceof ClickableDirective) {
                        instance = new ClickableDirective(e as HTMLElement);
                    } else if (d instanceof InputModelDirective) {
                        instance = new InputModelDirective(e as HTMLInputElement);
                    } else {
                        throw "Unrecognised directive " + e;
                    }

                    const expressionBinding = instance.render(ctrlOverride);
                    if (expressionBinding) {

                        if (!this.bindings.has(expressionBinding))
                            this.bindings.set(expressionBinding, []);

                        this.bindings.get(expressionBinding)?.push(instance);

                    }
                }
            })
        })
    }

    update(expression: string, value: any, target: any = this.scope ): boolean {

        try {
            eval(`target.${expression} = value`);

            this.logger.log(Level.VERBOSE, "updated property", expression, "set to", value);

            if (this.bindings.has(expression)) {
                this.bindings.get(expression)?.forEach((e) => {
                    // this.render(<HTMLElement>e.parentNode);
                    e.render(this);
                })
            }

            return true;
        } catch (ex) {
            this.logger.log(Level.ERROR, "failed to update property", expression);
            this.logger.log(Level.ERROR, ex);
        }
        return false;
    }

    render(ctrl: NewController = this, dataOverride?: any): string | void {

    }

}
/*

export class ControllerInstance extends Controller {
    scope: any

    private target: HTMLElement | undefined
    private logger: Logger

    private bindings: Map<string, Set<HTMLElement>> = new Map();

    constructor(name: string, data?: any) {
        super(name, data);

        let ctrl = this;

        this.logger = new Logger(`Bindy-Controller-${this.name}`, Level.VERBOSE);

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
*/
