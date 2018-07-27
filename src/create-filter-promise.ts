import { Filter, FieldFilter } from "./filter";
import { IFilterCondition } from "./filter-condition";

type InferPromiseType<T> = T extends Promise<infer U> ? U : T;

export type PromiseCreator<
  TPromise extends Promise<TPromiseType>,
  TPromiseType
> = (filterConditions: IFilterCondition[]) => TPromise;

export class PromisifiedFilter<
  TParentObject,
  TPromise extends Promise<TPromiseType>,
  TPromiseType = InferPromiseType<TPromise>
> extends Filter<TParentObject> {
  private readonly promiseCreator: PromiseCreator<TPromise, TPromiseType>;

  constructor(promiseCreator: PromiseCreator<TPromise, TPromiseType>) {
    super();

    this.promiseCreator = promiseCreator;
  }

  field<TProperty extends keyof TParentObject>(
    fieldName: TProperty,
  ): FieldFilter<
    TParentObject,
    TParentObject[TProperty],
    PromisifiedFilter<TParentObject, TPromise, TPromiseType>
  > {
    return new FieldFilter<
      TParentObject,
      TParentObject[TProperty],
      PromisifiedFilter<TParentObject, TPromise, TPromiseType>
    >(this, fieldName as string);
  }

  toPromise(): TPromise {
    return this.promiseCreator(this.query());
  }
}

export const createFilterPromise = <
  TParentObject,
  TPromise extends Promise<TPromiseType>,
  TPromiseType = InferPromiseType<TPromise>
>(
  promiseCreator: PromiseCreator<TPromise, TPromiseType>,
) =>
  new PromisifiedFilter<TParentObject, TPromise, TPromiseType>(promiseCreator);
