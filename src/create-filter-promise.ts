import { Filter, FieldFilter } from "./filter";
import { IFilterCondition } from "./filter-condition";

type InferPromiseType<T> = T extends Promise<infer U> ? U : T;

export type PromiseCreator<P extends Promise<T>, T = InferPromiseType<P>> = (
  filterConditions: IFilterCondition[],
) => P;

export class PromisifiedFilter<
  TPromise extends Promise<TObject>,
  TObject = InferPromiseType<TPromise>
> extends Filter<TObject> {
  private readonly promiseCreator: PromiseCreator<TPromise, TObject>;

  constructor(promiseCreator: PromiseCreator<TPromise, TObject>) {
    super();

    this.promiseCreator = promiseCreator;
  }

  field<TProperty extends keyof TObject>(
    fieldName: TProperty,
  ): FieldFilter<
    TObject,
    TObject[TProperty],
    PromisifiedFilter<TPromise, TObject>
  > {
    return new FieldFilter<
      TObject,
      TObject[TProperty],
      PromisifiedFilter<TPromise, TObject>
    >(this, fieldName as string);
  }

  toPromise(): TPromise {
    return this.promiseCreator(this.query());
  }
}

export const createFilterPromise = <
  P extends Promise<T>,
  T = InferPromiseType<P>
>(
  promiseCreator: PromiseCreator<P, T>,
) => new PromisifiedFilter<P, T>(promiseCreator);
