import {Controller} from "./controller";

export class Expression {
    protected readonly expression: string
    readonly ctrl: Controller

    constructor(ctrl: Controller, expression: string) {
        this.expression = expression;
        this.ctrl = ctrl;
    }

    resolve(): any {
        return this.ctrl.resolve(this.expression);
    }

    update(value: any): boolean {
        return this.ctrl.update(this.expression, value);
    }
}

export enum ChangeType {
    REASSIGN,
    APPEND,
    MODIFY
}

export interface ExpressionChangeEvent {
    oldValue: any
    newValue: any
    type: ChangeType
}

export interface ExpressionEventMap {
    change: CustomEvent<ExpressionChangeEvent>;
}

export class WatchedExpression extends EventTarget {
    readonly expression: Expression

    constructor(ctrl: Controller, expression: string) {
        super();
        this.expression = new Expression(ctrl, expression);
    }

    update(value: any, type: ChangeType = ChangeType.REASSIGN): boolean {
        this.dispatchEvent(new CustomEvent<ExpressionChangeEvent>('change', {detail: {oldValue: this.expression.resolve(), newValue: value, type}}));
        return this.expression.update(value);
    }

    resolve(): any {
        return this.expression.resolve();
    }
}
