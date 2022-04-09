import {ControllerInstance} from "./controller";

export interface Directive {
    selector: string

    // render(data: any, target: HTMLElement, cb?: Function): void
    render(ctrl: ControllerInstance, target: HTMLElement, dataOverride?: any): string | void
}

/*function evaluate(expression: string, data: any): any {
    const parts = expression.split(".");
    // let value: any = data || this.scope;
    let value: any = data;
    for (let part of parts) {
        if (part === '')
            continue;
        value = value[part];

    }

    return value;
}

function update(expression: string, data: any, val: any) {

    eval(`data.${expression} = val`);
    // const parts = expression.split(".");
    // let value: any = data || this.scope;
    // let value: any = data;

    // for (let i = 0; i < parts.length - 1; i++) {
    //     value = value[parts[i]];
    // }
    //
    // value[parts[parts.length - 1]] = val;
}*/

class StrBindDirective implements Directive {
    selector = "[bind-str]"
    private attr = "bind-str"

    render(ctrl: ControllerInstance, target: HTMLElement, data?: any) {
        const attr = target.getAttribute(this.attr);

        target.textContent = ctrl.get(attr || '', data);
        if (attr)
            return attr
    }

    // render(data: any, target: HTMLElement) {
    //     const attr = target.getAttribute(this.attr);
    //
    //     if (attr)
    //         target.textContent = evaluate(attr, data)
    // }
}

class ForLoopDirective implements Directive {
    selector = "[bind-for]"
    private attr = "bind-for"


    // render(data: any, target: HTMLElement, cb?: Function) {
    render(ctrl: ControllerInstance, target: HTMLElement, data?: any) {
        const attr = target?.getAttribute(this.attr),
            output = document.createDocumentFragment();

        if (attr) {
            const arr = ctrl.get(attr, data);
            // const arr = evaluate(attr, data);
            if (Array.isArray(arr)) {
                arr.forEach((item: any) => {
                    let itemEl = document.createElement(target.tagName);
                    itemEl.innerHTML = target.innerHTML;
                    output.appendChild(itemEl);

                    ctrl.render(itemEl, item);
                })

                target.innerHTML = '';
                target.replaceChildren(output);

            }

            return attr;
        }
    }
}

class InputModelDirective implements Directive {
    selector = "input[bind-model]"
    private attr = "bind-model"
    // private update: Function

    render(ctrl: ControllerInstance, target: HTMLInputElement, data?: any) {
        // this.update = cb;

        // Configure the current value
        const attr = target.getAttribute(this.attr);

        if (attr) {
            // target.value
            // const currValue = evaluate(attr, data);

            // Assign current value
            target.value = ctrl.get(attr, data);

            // Set-up event handlers
            target.oninput = function (e) {
                if (!e.target)
                    return;

                const updatedElem = <HTMLInputElement>(e.target),
                    newValue = updatedElem.value;

                ctrl.update(attr, newValue, data);
                // update(attr, data, newValue);
            }

            // return attr;
        }

    }
}

export class ClickableDirective implements Directive {
    selector = "[bind-click]"
    attr = "bind-click"

    render(ctrl: ControllerInstance, target: HTMLElement, data?: any) {
        target.onclick = function(e) {

        }
    }
}

export const DIRECTIVES: Directive[] = [
    new StrBindDirective(),
    new ForLoopDirective(),
    new InputModelDirective()
]
