import { Predicate } from "./predicate";
import { IFilterCondition } from "./filter-condition";
export declare class Filter<TObject> {
    private readonly conditions;
    field<TProperty extends keyof TObject>(fieldName: TProperty): FieldFilter<TObject, TObject[TProperty], Filter<TObject>>;
    query(): IFilterCondition[];
    predicate(fieldName: string, predicate: Predicate, value?: any, values?: any[]): Filter<TObject>;
}
export declare class FieldFilter<TParentObject, TProperty, TFilter extends Filter<TParentObject>> {
    private readonly parent;
    private readonly fieldName;
    constructor(parent: TFilter, fieldName: string);
    predicate(predicate: Predicate, value?: TProperty, values?: TProperty[]): TFilter;
    then<TNestedField extends keyof TProperty>(fieldName: TNestedField): FieldFilter<TParentObject, TProperty[TNestedField], TFilter>;
    contains(value: TProperty): TFilter;
    equal(value: TProperty): TFilter;
    doesNotEqual(value: TProperty): TFilter;
    lessThan(value: TProperty): TFilter;
    lessThanOrEqual(value: TProperty): TFilter;
    greaterThan(value: TProperty): TFilter;
    greaterThanOrEqual(value: TProperty): TFilter;
    startsWith(value: TProperty): TFilter;
    endsWith(value: TProperty): TFilter;
    oneOf(values: TProperty[]): TFilter;
}
declare const _default: <T>() => Filter<T>;
export default _default;
