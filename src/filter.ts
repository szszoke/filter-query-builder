import { Predicate } from "./predicate";
import { IFilterCondition } from "./filter-condition";

export class Filter<TObject> {
  private readonly conditions: IFilterCondition[] = [];

  field<TProperty extends keyof TObject>(
    fieldName: TProperty,
  ): FieldFilter<TObject, TObject[TProperty], Filter<TObject>> {
    return new FieldFilter<TObject, TObject[TProperty], Filter<TObject>>(
      this,
      fieldName as string,
    );
  }

  query(): IFilterCondition[] {
    return this.conditions;
  }

  predicate(
    fieldName: string,
    predicate: Predicate,
    value?: any,
    values?: any[],
  ): Filter<TObject> {
    this.conditions.push({
      fieldName,
      predicate,
      value,
      values,
    });

    return this;
  }
}

export class FieldFilter<
  TParentObject,
  TProperty,
  TFilter extends Filter<TParentObject>
> {
  private readonly parent: TFilter;
  private readonly fieldName: string;

  constructor(parent: TFilter, fieldName: string) {
    this.parent = parent;
    this.fieldName = fieldName;
  }

  predicate(
    predicate: Predicate,
    value?: TProperty,
    values?: TProperty[],
  ): TFilter {
    return this.parent.predicate(
      this.fieldName,
      predicate,
      value,
      values,
    ) as TFilter;
  }

  then<TNestedField extends keyof TProperty>(
    fieldName: TNestedField,
  ): FieldFilter<TParentObject, TProperty[TNestedField], TFilter> {
    return new FieldFilter<TParentObject, TProperty[TNestedField], TFilter>(
      this.parent,
      `${this.fieldName}.${fieldName as string}`,
    );
  }

  contains(value: TProperty): TFilter {
    return this.predicate("contains", value);
  }

  equal(value: TProperty): TFilter {
    return this.predicate("equal", value);
  }

  doesNotEqual(value: TProperty): TFilter {
    return this.predicate("doesNotEqual", value);
  }

  lessThan(value: TProperty): TFilter {
    return this.predicate("lessThan", value);
  }

  lessThanOrEqual(value: TProperty): TFilter {
    return this.predicate("lessThanOrEqual", value);
  }

  greaterThan(value: TProperty): TFilter {
    return this.predicate("greaterThan", value);
  }

  greaterThanOrEqual(value: TProperty): TFilter {
    return this.predicate("greaterThanOrEqual", value);
  }

  startsWith(value: TProperty): TFilter {
    return this.predicate("startsWith", value);
  }

  endsWith(value: TProperty): TFilter {
    return this.predicate("endsWith", value);
  }

  oneOf(values: TProperty[]): TFilter {
    return this.predicate("oneOf", undefined, values);
  }
}

export default <T>() => new Filter<T>();
