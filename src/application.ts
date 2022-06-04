import {Controller} from "./controller";
import {Directive} from "./directives/abstract.directives";

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

    const rootCtrl = new Controller(dataObj);

    eval(`${bindExpression} = rootCtrl.scope`);

    // @ts-ignore
    rootCtrl.compile(elem);
    (window as any).app = rootCtrl;

}
// @ts-ignore
window.addEventListener('load', bootstrap, true);
