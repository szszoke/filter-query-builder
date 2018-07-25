export type Predicate =
    | "contains"
    | "equal"
    | "doesNotEqual"
    | "lessThan"
    | "lessThanOrEqual"
    | "greaterThan"
    | "greaterThanOrEqual"
    | "startsWith"
    | "endsWith";

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

    equal = (value: TProperty): Filter<TParentObject> =>
        this.predicate(value, "equal");
    
    doesNotEqual = (value: TProperty): Filter<TParentObject> =>
        this.predicate(value, "doesNotEqual");

    lessThan = (value: TProperty): Filter<TParentObject> =>
        this.predicate(value, "lessThan");

    lessThanOrEqual = (value: TProperty): Filter<TParentObject> =>
        this.predicate(value, "lessThanOrEqual");

    greaterThan = (value: TProperty): Filter<TParentObject> =>
        this.predicate(value, "greaterThan");

    greaterThanOrEqual = (value: TProperty): Filter<TParentObject> =>
        this.predicate(value, "greaterThanOrEqual");

    startsWith = (value: TProperty): Filter<TParentObject> =>
        this.predicate(value, "startsWith");

    endsWith = (value: TProperty): Filter<TParentObject> =>
        this.predicate(value, "endsWith");
}

export default <T>() => new Filter<T>();
