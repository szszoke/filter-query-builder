export type Predicate =
    | "contains"
    | "equals"
    | "less-than"
    | "less-than-or-equal"
    | "greater-than"
    | "greater-than-or-equal"
    | "starts-with"
    | "ends-with";

export interface FilterCondition {
    field: string;
    predicate: Predicate;
    value: any;
}

class Filter<TObject> {
    private readonly conditions: Array<FilterCondition> = [];

    field = <TProperty extends keyof TObject>(field: TProperty): FieldFilter<TObject, TObject[TProperty]> =>
        new FieldFilter<TObject, TObject[TProperty]>(this, field as string);

    query = (): Array<FilterCondition> => this.conditions;

    predicate = (field: string, value: any, predicate: Predicate): Filter<TObject> => {
        this.conditions.push({
            field,
            predicate,
            value,
        });

        return this;
    }
}

class FieldFilter<TParentObject, TProperty> {
    private readonly parent: Filter<TParentObject>;
    private readonly field: string;

    constructor(parent: Filter<TParentObject>, field: string) {
        this.parent = parent;
        this.field = field;
    }

    predicate = (value: TProperty, predicate: Predicate): Filter<TParentObject> => {
        return this.parent.predicate(
            this.field,
            value,
            predicate,
        );
    }

    then = <TNestedField extends keyof TProperty>(field: TNestedField): FieldFilter<TParentObject, TProperty[TNestedField]> =>
        new FieldFilter<TParentObject, TProperty[TNestedField]>(this.parent, `${this.field}.${field as string}`);

    contains = (value: TProperty): Filter<TParentObject> =>
        this.predicate(value, "contains");

    equals = (value: TProperty): Filter<TParentObject> =>
        this.predicate(value, "equals");

    lessThan = (value: TProperty): Filter<TParentObject> =>
        this.predicate(value, "less-than");

    lessThanOrEqual = (value: TProperty): Filter<TParentObject> =>
        this.predicate(value, "less-than-or-equal");

    greaterThan = (value: TProperty): Filter<TParentObject> =>
        this.predicate(value, "greater-than");

    greaterThanOrEqual = (value: TProperty): Filter<TParentObject> =>
        this.predicate(value, "greater-than-or-equal");

    startsWith = (value: TProperty): Filter<TParentObject> =>
        this.predicate(value, "starts-with");

    endsWith = (value: TProperty): Filter<TParentObject> =>
        this.predicate(value, "ends-with");
}

export default <T>() => new Filter<T>();
