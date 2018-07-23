export declare type Predicate = "contains" | "equals" | "less-than" | "less-than-or-equal" | "greater-than" | "greater-than-or-equal" | "starts-with" | "ends-with";
export interface FilterCondition<T> {
    field: keyof T;
    predicate: Predicate;
    value: any;
}
declare class Filter<T> {
    private readonly conditions;
    field: <K extends keyof T>(field: K) => FieldFilter<T, T[K]>;
    query: () => FilterCondition<T>[];
    predicate: <K extends keyof T>(field: K, value: any, predicate: Predicate) => Filter<T>;
}
declare class FieldFilter<T, K> {
    private readonly parent;
    private readonly field;
    constructor(parent: Filter<T>, field: keyof T);
    predicate: (value: K, predicate: Predicate) => Filter<T>;
    contains: (value: K) => Filter<T>;
    equals: (value: K) => Filter<T>;
    lessThan: (value: K) => Filter<T>;
    lessThanOrEqual: (value: K) => Filter<T>;
    greaterThan: (value: K) => Filter<T>;
    greaterThanOrEqual: (value: K) => Filter<T>;
    startsWith: (value: K) => Filter<T>;
    endsWith: (value: K) => Filter<T>;
}
declare const _default: <T>() => Filter<T>;
export default _default;
