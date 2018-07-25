export declare type Predicate = "contains" | "equal" | "doesNotEqual" | "lessThan" | "lessThanOrEqual" | "greaterThan" | "greaterThanOrEqual" | "startsWith" | "endsWith" | "oneOf";
export interface FilterCondition {
    fieldName: string;
    predicate: Predicate;
    value?: any;
    values?: any[];
}
declare class Filter<TObject> {
    private readonly conditions;
    field: <TProperty extends keyof TObject>(fieldName: TProperty) => FieldFilter<TObject, TObject[TProperty]>;
    query: () => FilterCondition[];
    predicate: (fieldName: string, predicate: Predicate, value?: any, values?: any[] | undefined) => Filter<TObject>;
}
declare class FieldFilter<TParentObject, TProperty> {
    private readonly parent;
    private readonly fieldName;
    constructor(parent: Filter<TParentObject>, fieldName: string);
    predicate: (predicate: Predicate, value?: TProperty | undefined, values?: TProperty[] | undefined) => Filter<TParentObject>;
    then: <TNestedField extends keyof TProperty>(fieldName: TNestedField) => FieldFilter<TParentObject, TProperty[TNestedField]>;
    contains: (value: TProperty) => Filter<TParentObject>;
    equal: (value: TProperty) => Filter<TParentObject>;
    doesNotEqual: (value: TProperty) => Filter<TParentObject>;
    lessThan: (value: TProperty) => Filter<TParentObject>;
    lessThanOrEqual: (value: TProperty) => Filter<TParentObject>;
    greaterThan: (value: TProperty) => Filter<TParentObject>;
    greaterThanOrEqual: (value: TProperty) => Filter<TParentObject>;
    startsWith: (value: TProperty) => Filter<TParentObject>;
    endsWith: (value: TProperty) => Filter<TParentObject>;
    oneOf: (values: TProperty[]) => Filter<TParentObject>;
}
declare const _default: <T>() => Filter<T>;
export default _default;
