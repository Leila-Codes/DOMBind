/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
var bindy;
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/controller.ts":
/*!***************************!*\
  !*** ./src/controller.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.ControllerInstance = exports.Controller = void 0;\r\nconst logging_1 = __webpack_require__(/*! ./logging */ \"./src/logging.ts\");\r\nconst directive_1 = __webpack_require__(/*! ./directive */ \"./src/directive.ts\");\r\nclass Controller {\r\n    constructor(name, data) {\r\n        this.name = name;\r\n        if (data != undefined)\r\n            this.data = data;\r\n    }\r\n    instantiate() {\r\n        return new ControllerInstance(this.name, this.data);\r\n    }\r\n}\r\nexports.Controller = Controller;\r\nclass ControllerInstance extends Controller {\r\n    constructor(name, data) {\r\n        super(name, data);\r\n        this.bindings = new Map();\r\n        let ctrl = this;\r\n        this.logger = new logging_1.Logger(`Bindy-Controller-${this.name}`, logging_1.Level.INFO);\r\n        if (name)\r\n            this.name = name;\r\n        this.scope = data || {};\r\n    }\r\n    get(expression, target) {\r\n        if (!target)\r\n            target = this.data;\r\n        try {\r\n            return eval(`target.${expression}`);\r\n        }\r\n        catch (ex) {\r\n            this.logger.log(logging_1.Level.ERROR, \"failed to fetch property\", expression, \"from\", target);\r\n        }\r\n    }\r\n    update(expression, value, target) {\r\n        if (!target)\r\n            target = this.data;\r\n        try {\r\n            eval(`target.${expression} = value`);\r\n            this.logger.log(logging_1.Level.VERBOSE, \"updated property\", expression, \"set to\", value);\r\n            if (this.bindings.has(expression)) {\r\n                this.bindings.get(expression)?.forEach((e) => {\r\n                    this.render(e.parentNode);\r\n                });\r\n            }\r\n            return true;\r\n        }\r\n        catch (ex) {\r\n            this.logger.log(logging_1.Level.ERROR, \"failed to update property\", expression);\r\n            return false;\r\n        }\r\n    }\r\n    bind(target) {\r\n        this.target = target;\r\n        this.render();\r\n    }\r\n    render(target, dataOverride) {\r\n        const ctrl = this;\r\n        if (!target)\r\n            target = this.target;\r\n        directive_1.DIRECTIVES.forEach((d) => {\r\n            const els = target?.querySelectorAll(d.selector);\r\n            this.logger.log(logging_1.Level.VERBOSE, \"processing directive\", d.selector, \"on\", els);\r\n            if (els)\r\n                els.forEach((e) => {\r\n                    const expression = d.render(ctrl, e, dataOverride);\r\n                    if (expression) {\r\n                        if (!this.bindings.has(expression))\r\n                            this.bindings.set(expression, new Set());\r\n                        // @ts-ignore\r\n                        this.bindings.get(expression).add(e);\r\n                    }\r\n                });\r\n        });\r\n    }\r\n    parseEl(template) {\r\n        const el = document.createElement('div');\r\n        el.innerHTML = template;\r\n        return el;\r\n    }\r\n    evaluate(expression, data) {\r\n        const parts = expression.split(\".\");\r\n        let value = data || this.scope;\r\n        for (let part of parts) {\r\n            if (part === '')\r\n                continue;\r\n            value = value[part];\r\n        }\r\n        return value;\r\n    }\r\n}\r\nexports.ControllerInstance = ControllerInstance;\r\n\n\n//# sourceURL=webpack://bindy/./src/controller.ts?");

/***/ }),

/***/ "./src/directive.ts":
/*!**************************!*\
  !*** ./src/directive.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.DIRECTIVES = void 0;\r\nfunction evaluate(expression, data) {\r\n    const parts = expression.split(\".\");\r\n    // let value: any = data || this.scope;\r\n    let value = data;\r\n    for (let part of parts) {\r\n        if (part === '')\r\n            continue;\r\n        value = value[part];\r\n    }\r\n    return value;\r\n}\r\nfunction update(expression, data, val) {\r\n    eval(`data.${expression} = val`);\r\n    // const parts = expression.split(\".\");\r\n    // let value: any = data || this.scope;\r\n    // let value: any = data;\r\n    // for (let i = 0; i < parts.length - 1; i++) {\r\n    //     value = value[parts[i]];\r\n    // }\r\n    //\r\n    // value[parts[parts.length - 1]] = val;\r\n}\r\nclass StrBindDirective {\r\n    constructor() {\r\n        this.selector = \"[bind-str]\";\r\n        this.attr = \"bind-str\";\r\n        // render(data: any, target: HTMLElement) {\r\n        //     const attr = target.getAttribute(this.attr);\r\n        //\r\n        //     if (attr)\r\n        //         target.textContent = evaluate(attr, data)\r\n        // }\r\n    }\r\n    render(ctrl, target, data) {\r\n        const attr = target.getAttribute(this.attr);\r\n        if (attr) {\r\n            target.textContent = ctrl.get(attr, data);\r\n            return attr;\r\n        }\r\n    }\r\n}\r\nclass ForLoopDirective {\r\n    constructor() {\r\n        this.selector = \"[bind-for]\";\r\n        this.attr = \"bind-for\";\r\n    }\r\n    // render(data: any, target: HTMLElement, cb?: Function) {\r\n    render(ctrl, target, data) {\r\n        const attr = target?.getAttribute(this.attr), output = document.createDocumentFragment();\r\n        if (attr) {\r\n            const arr = ctrl.get(attr, data);\r\n            // const arr = evaluate(attr, data);\r\n            if (Array.isArray(arr)) {\r\n                arr.forEach((item) => {\r\n                    let itemEl = document.createElement(target.tagName);\r\n                    itemEl.innerHTML = target.innerHTML;\r\n                    output.appendChild(itemEl);\r\n                    ctrl.render(itemEl, item);\r\n                });\r\n                target.innerHTML = '';\r\n                target.replaceChildren(output);\r\n            }\r\n            return attr;\r\n        }\r\n    }\r\n}\r\nclass InputModelDirective {\r\n    constructor() {\r\n        this.selector = \"input[bind-model]\";\r\n        this.attr = \"bind-model\";\r\n    }\r\n    // private update: Function\r\n    render(ctrl, target, data) {\r\n        // this.update = cb;\r\n        // Configure the current value\r\n        const attr = target.getAttribute(this.attr);\r\n        if (attr) {\r\n            // target.value\r\n            // const currValue = evaluate(attr, data);\r\n            // Assign current value\r\n            target.value = ctrl.get(attr, data);\r\n            // Set-up event handlers\r\n            target.oninput = function (e) {\r\n                if (!e.target)\r\n                    return;\r\n                const updatedElem = (e.target), newValue = updatedElem.value;\r\n                ctrl.update(attr, newValue, data);\r\n                // update(attr, data, newValue);\r\n            };\r\n            // return attr;\r\n        }\r\n    }\r\n}\r\nexports.DIRECTIVES = [\r\n    new StrBindDirective(),\r\n    new ForLoopDirective(),\r\n    new InputModelDirective()\r\n];\r\n\n\n//# sourceURL=webpack://bindy/./src/directive.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.Controller = exports.bootstrap = void 0;\r\nconst logging_1 = __webpack_require__(/*! ./logging */ \"./src/logging.ts\");\r\nfunction bootstrap() {\r\n    let _logger = new logging_1.Logger(\"Bindy-Bootstrap\");\r\n    _logger.log(logging_1.Level.VERBOSE, \"bootstrap started\");\r\n    const controllerBindings = document.querySelectorAll(\"[bind-controller]\");\r\n    controllerBindings.forEach((bindElem) => {\r\n        _logger.log(logging_1.Level.VERBOSE, \"discovered controller binding - {\", bindElem.tagName, \"#\", bindElem.id, \"}\");\r\n        const ctrlName = bindElem.getAttribute(\"bind-controller\");\r\n        if (ctrlName) {\r\n            _logger.log(logging_1.Level.VERBOSE, \"attempting to resolve controller with var name\", ctrlName);\r\n            try {\r\n                const ctrl = eval(ctrlName);\r\n                _logger.log(logging_1.Level.VERBOSE, \"resolved to\", ctrl);\r\n                if (ctrl) {\r\n                    _logger.log(logging_1.Level.VERBOSE, \"instantiating... \");\r\n                    const instance = ctrl.instantiate();\r\n                    instance.bind(bindElem);\r\n                }\r\n            }\r\n            catch (ex) {\r\n                _logger.log(logging_1.Level.ERROR, \"controller instantiation failed - error\", ex);\r\n            }\r\n        }\r\n    });\r\n    // const ctrl = Controller.bind(<HTMLElement>bindElem);\r\n    /*\r\n    \r\n            const controllerName = bindElem.getAttribute(\"bind-controller\");\r\n            if (controllerName) {\r\n                try {\r\n                    const controller = eval(controllerName);\r\n    \r\n                    <Controller>controller.bind(bindElem);\r\n                } catch (ex: any) {\r\n                    _logger.log(Level.ERROR, ex.toString());\r\n                }\r\n            }*/\r\n    // })\r\n    // const appContainer = document.querySelector(\"[bind-app]\");\r\n    // if (appContainer) {\r\n    //     _logger.log(Level.VERBOSE, \"discovered controller binding for - {#\", appContainer.id, \"}\");\r\n    //\r\n    //     const ctrl = Controller.bind(appContainer);\r\n    /*\r\n    const varName = appContainer.getAttribute(\"bind-app\");\r\n    _logger.log(Level.VERBOSE, `app container binds to - ${varName} `);\r\n\r\n    if (varName) {\r\n        // @ts-ignore\r\n        // let application = window[varName];\r\n        let application = eval(varName);\r\n        _logger.log(Level.VERBOSE, `evaluates to ${application}`);\r\n\r\n        if (application) {\r\n            application.parent = appContainer;\r\n        }\r\n    }*/\r\n    // }\r\n}\r\nexports.bootstrap = bootstrap;\r\nvar controller_1 = __webpack_require__(/*! ./controller */ \"./src/controller.ts\");\r\nObject.defineProperty(exports, \"Controller\", ({ enumerable: true, get: function () { return controller_1.Controller; } }));\r\nwindow.onload = function () {\r\n    // app = new bindy.Component({name: 'HelloWorldApplication'})\r\n    bootstrap();\r\n};\r\n\n\n//# sourceURL=webpack://bindy/./src/index.ts?");

/***/ }),

/***/ "./src/logging.ts":
/*!************************!*\
  !*** ./src/logging.ts ***!
  \************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.Logger = exports.Level = void 0;\r\nvar Level;\r\n(function (Level) {\r\n    Level[Level[\"ERROR\"] = 0] = \"ERROR\";\r\n    Level[Level[\"WARNING\"] = 1] = \"WARNING\";\r\n    Level[Level[\"INFO\"] = 2] = \"INFO\";\r\n    Level[Level[\"VERBOSE\"] = 3] = \"VERBOSE\";\r\n})(Level = exports.Level || (exports.Level = {}));\r\nclass Logger {\r\n    constructor(name, level = Level.VERBOSE) {\r\n        this.level = Level.INFO;\r\n        this.name = name;\r\n        if (level)\r\n            this.level = level;\r\n    }\r\n    log(level = Level.INFO, ...message) {\r\n        if (level <= this.level) {\r\n            // const stack = new Error().stack?.split(\"\\n\")[1];\r\n            const msg = [\r\n                new Date().toLocaleTimeString(),\r\n                `[${Level[level].toLowerCase()}]`,\r\n                this.name,\r\n                \"\"\r\n            ].join(\"\\t|  \");\r\n            switch (level) {\r\n                case Level.INFO:\r\n                    console.info(msg, ...message);\r\n                    break;\r\n                case Level.WARNING:\r\n                    console.warn(msg, ...message);\r\n                    break;\r\n                case Level.VERBOSE:\r\n                    console.debug(msg, ...message);\r\n                    break;\r\n                case Level.ERROR:\r\n                default:\r\n                    console.error(msg, ...message);\r\n                    break;\r\n            }\r\n        }\r\n    }\r\n}\r\nexports.Logger = Logger;\r\n\n\n//# sourceURL=webpack://bindy/./src/logging.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	bindy = __webpack_exports__;
/******/ 	
/******/ })()
;