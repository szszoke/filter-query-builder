import { Filter, FieldFilter } from "./filter";
import { IFilterCondition } from "./filter-condition";
declare type InferPromiseType<T> = T extends Promise<infer U> ? U : T;
export declare type PromiseCreator<TPromise extends Promise<TPromiseType>, TPromiseType> = (filterConditions: IFilterCondition[]) => TPromise;
export declare class PromisifiedFilter<TParentObject, TPromise extends Promise<TPromiseType>, TPromiseType = InferPromiseType<TPromise>> extends Filter<TParentObject> {
    private readonly promiseCreator;
    constructor(promiseCreator: PromiseCreator<TPromise, TPromiseType>);
    field<TProperty extends keyof TParentObject>(fieldName: TProperty): FieldFilter<TParentObject, TParentObject[TProperty], PromisifiedFilter<TParentObject, TPromise, TPromiseType>>;
    toPromise(): TPromise;
}
export declare const createFilterPromise: <TParentObject, TPromise extends Promise<TPromiseType>, TPromiseType = InferPromiseType<TPromise>>(promiseCreator: PromiseCreator<TPromise, TPromiseType>) => PromisifiedFilter<TParentObject, TPromise, TPromiseType>;
export {};
