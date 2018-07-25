export declare type Predicate = "contains" | "equal" | "doesNotEqual" | "lessThan" | "lessThanOrEqual" | "greaterThan" | "greaterThanOrEqual" | "startsWith" | "endsWith";
export interface FilterCondition {
    field: string;
    predicate: Predicate;
    value: any;
}
declare class Filter<TObject> {
    private readonly conditions;
    field: <TProperty extends keyof TObject>(field: TProperty) => FieldFilter<TObject, TObject[TProperty]>;
    query: () => FilterCondition[];
    predicate: (field: string, value: any, predicate: Predicate) => Filter<TObject>;
}
declare class FieldFilter<TParentObject, TProperty> {
    private readonly parent;
    private readonly field;
    constructor(parent: Filter<TParentObject>, field: string);
    predicate: (value: TProperty, predicate: Predicate) => Filter<TParentObject>;
    then: <TNestedField extends keyof TProperty>(field: TNestedField) => FieldFilter<TParentObject, TProperty[TNestedField]>;
    contains: (value: TProperty) => Filter<TParentObject>;
    equal: (value: TProperty) => Filter<TParentObject>;
    doesNotEqual: (value: TProperty) => Filter<TParentObject>;
    lessThan: (value: TProperty) => Filter<TParentObject>;
    lessThanOrEqual: (value: TProperty) => Filter<TParentObject>;
    greaterThan: (value: TProperty) => Filter<TParentObject>;
    greaterThanOrEqual: (value: TProperty) => Filter<TParentObject>;
    startsWith: (value: TProperty) => Filter<TParentObject>;
    endsWith: (value: TProperty) => Filter<TParentObject>;
}
declare const _default: <T>() => Filter<T>;
export default _default;
