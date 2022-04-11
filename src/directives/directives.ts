import {VisibilityDirective} from "../directive";
import { Directive, StrBindDirective } from "./abstract.directives";
import {ForLoopDirective} from "./loop.directives";
import {InputModelDirective} from "./input.directives";
import {ClickableDirective} from "./event.directives";

export const DIRECTIVES: Directive[] = [
    new StrBindDirective(),
    new ForLoopDirective(),
    new InputModelDirective(),
    new ClickableDirective(),
    new VisibilityDirective()
]
