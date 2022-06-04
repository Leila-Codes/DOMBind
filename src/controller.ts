import {Level, Logger} from "./logging";
import {DIRECTIVES, sanitizeExpression} from "./directives/directives";
import {
    Directive, /*DirectiveInstace, DirectiveInstance,*/
    StrBindDirective,
    VisibilityDirective
} from "./directives/abstract.directives";
import {ForLoopDirective} from "./directives/loop.directives";
import {InputModelDirective} from "./directives/input.directives";
import {ClickableDirective} from "./directives/event.directives";
import {ClassDirective} from "./directives/class-directive";
import {StyleDirective} from "./directives/style-directive";

export class Controller extends Directive {
    // selector = "[bind-controller]"

    // private scope: Map<string, Object> = new Map();
    private scope: ProxyHandler<Map<string, Object>>;
    private logger: Logger
    // @ts-ignore
    private bindings: Map<string, Directive[]> = new Map();

    constructor(data?: any) {
        super("[bind-controller]");

        const ctrl = this;

        this.scope = new Proxy(data, {
            set(target: any, p: string | symbol, value: any, receiver: any): boolean {
                target[p] = value;

                ctrl.postUpdate(p as string);

                return true;
            },
            get(target: any, p: string | symbol, receiver: any): any {
                return target[p];
            }
        });

        this.logger = new Logger(`Bindy-Controller`, Level.VERBOSE);
    }

    resolve(expression: string, target: any = this.scope): any {

        let invert = false;

        if (expression.startsWith("!")) {
            expression = expression.replace("!", "");
            invert = true;
        }

        // const ctrlValue = eval(`target.${expression}`);

        const parts = expression.split("."),
            isLast = parts.length === 1;

        if (target[parts[0]] !== undefined) {
            if (isLast) {
                return invert ? !target[parts[0]] : target[parts[0]];
            }
            return this.resolve(parts.slice(1).join("."), target[parts[0]]);
        } else { // @ts-ignore
            if ( window[parts[0]]) {
                if (isLast) {
                    // @ts-ignore
                    return window[parts[0]];
                }
                return this.resolve(parts.slice(1).join("."), window)
            } else {
                try {
                    const rawVal = JSON.parse(`{"value": ${expression}}`);
                    return invert ? !rawVal.value : rawVal.value;
                } catch (ex) {
                    this.logger.log(Level.WARNING, "failed to fetch property", expression, "from", target);
                }
            }
        }
    }

    compile(target: HTMLElement, ctrlOverride: Controller = this) {

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
                    } else if (d instanceof VisibilityDirective) {
                        instance = new VisibilityDirective(e as HTMLElement);
                    } else if (d instanceof ClassDirective) {
                        instance = new ClassDirective(e as HTMLElement);
                    } else if (d instanceof StyleDirective) {
                        instance = new StyleDirective(e as HTMLElement);
                    } else {
                        throw "Unrecognised directive " + e;
                    }

                    // const expressionBinding = instance.render(ctrlOverride);
                    // if (expressionBinding) {

                        // if (!this.bindings.has(instance.expression))
                        //     this.bindings.set(instance.expression, []);

                        // this.bindings.get(instance.expression)?.push(instance);

                    // }

                    for (let binding of instance.bindings()) {
                        binding = sanitizeExpression(binding);

                        if (!this.bindings.has(binding))
                            this.bindings.set(binding, []);

                        this.bindings.get(binding)?.push(instance);
                    }
                }
            })
        })

        this.render();
    }

    update(expression: string, value: any, target: any = this.scope): boolean {

        try {
            eval(`target.${expression} = value`);

            this.logger.log(Level.VERBOSE, "updated property", expression, "set to", value);

            this.postUpdate(expression);

            return true;
        } catch (ex) {
            this.logger.log(Level.ERROR, "failed to update property", expression);
            this.logger.log(Level.ERROR, ex);
        }
        return false;
    }

    postUpdate(expression: string) {
        this.logger.log(Level.VERBOSE, "triggering post updates for property", expression);

        if (this.bindings.has(expression)) {
            this.bindings.get(expression)?.forEach((e) => {
                e.render(this);
            })
        }
    }

    render(ctrl: Controller = this, dataOverride?: any): string | void {
        this.bindings.forEach((directives, expression) => {
            directives.forEach((directive) => {
                directive.render(ctrl, dataOverride);
            })
        })
    }

}
