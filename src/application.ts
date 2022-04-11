import {NewController} from "./controller";
import {Directive} from "./directives/abstract.directives";

// export class Application {
//     // selector = "[bind-app]"
//     target: HTMLElement
//     root: NewController
//
//     constructor(target: HTMLElement, data?: any) {
//         this.target = target;
//
//         this.root = new NewController(data);
//         this.root.compile(this.target);
//     }
// }

export default function bootstrap() {
    const elem = document.querySelector("[bind-app]"),
        bindExpression = elem?.getAttribute("bind-app");

    if (!elem)
        return;

    let dataObj = {};

    if (bindExpression)
        try {
            dataObj = eval(bindExpression);
        } catch (ex) {
        }

    const rootCtrl = new NewController(dataObj);
    // @ts-ignore
    rootCtrl.compile(elem);
    (window as any).app = rootCtrl;

}

window.onload = bootstrap;
