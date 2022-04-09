import {Controller, ControllerInstance} from "./controller";
import {Level, Logger} from "./logging";

export function bootstrap() {
    let _logger = new Logger("Bindy-Bootstrap");

    _logger.log(Level.VERBOSE, "bootstrap started");

    const controllerBindings = document.querySelectorAll("[bind-controller]");
    controllerBindings.forEach((bindElem) => {
        _logger.log(Level.VERBOSE, "discovered controller binding - {", bindElem.tagName, "#", bindElem.id, "}");

        const ctrlName = bindElem.getAttribute("bind-controller");
        if (ctrlName) {
            _logger.log(Level.VERBOSE, "attempting to resolve controller with var name", ctrlName);
            try {
                const ctrl = eval(ctrlName);
                _logger.log(Level.VERBOSE, "resolved to", ctrl);
                if (ctrl) {
                    _logger.log(Level.VERBOSE, "instantiating... ");

                    const instance = <ControllerInstance>ctrl.instantiate();
                    instance.bind(<HTMLElement>bindElem);
                }
            } catch (ex) {
                _logger.log(Level.ERROR, "controller instantiation failed - error", ex);
            }
        }
    });
        // const ctrl = Controller.bind(<HTMLElement>bindElem);
/*

        const controllerName = bindElem.getAttribute("bind-controller");
        if (controllerName) {
            try {
                const controller = eval(controllerName);

                <Controller>controller.bind(bindElem);
            } catch (ex: any) {
                _logger.log(Level.ERROR, ex.toString());
            }
        }*/
    // })

    // const appContainer = document.querySelector("[bind-app]");
    // if (appContainer) {
    //     _logger.log(Level.VERBOSE, "discovered controller binding for - {#", appContainer.id, "}");
    //
    //     const ctrl = Controller.bind(appContainer);

        /*
        const varName = appContainer.getAttribute("bind-app");
        _logger.log(Level.VERBOSE, `app container binds to - ${varName} `);

        if (varName) {
            // @ts-ignore
            // let application = window[varName];
            let application = eval(varName);
            _logger.log(Level.VERBOSE, `evaluates to ${application}`);

            if (application) {
                application.parent = appContainer;
            }
        }*/
    // }
}

export { Controller } from "./controller"

window.onload = function () {
    // app = new bindy.Component({name: 'HelloWorldApplication'})
    bootstrap();
}
