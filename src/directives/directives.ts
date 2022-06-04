import {Directive, StrBindDirective, VisibilityDirective} from "./abstract.directives";
import {ForLoopDirective} from "./loop.directives";
import {InputModelDirective} from "./input.directives";
import {ClickableDirective} from "./event.directives";
import {StyleDirective} from "./style-directive";
import {ClassDirective} from "./class-directive";

export const DIRECTIVES: Directive[] = [
    new StrBindDirective(),
    new ForLoopDirective(),
    new InputModelDirective(),
    new ClickableDirective(),
    new VisibilityDirective(),
    new StyleDirective(),
    new ClassDirective()
]

export function sanitizeExpression(expression: string) {
    return expression.replace("!", "").trim();
}
