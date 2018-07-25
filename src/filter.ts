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
    fieldName: string;
    predicate: Predicate;
    value: any;
}

class Filter<TObject> {
    private readonly conditions: Array<FilterCondition> = [];

    field = <TProperty extends keyof TObject>(fieldName: TProperty): FieldFilter<TObject, TObject[TProperty]> =>
        new FieldFilter<TObject, TObject[TProperty]>(this, fieldName as string);

    query = (): Array<FilterCondition> => this.conditions;

    predicate = (fieldName: string, value: any, predicate: Predicate): Filter<TObject> => {
        this.conditions.push({
            fieldName,
            predicate,
            value,
        });

        return this;
    }
}

class FieldFilter<TParentObject, TProperty> {
    private readonly parent: Filter<TParentObject>;
    private readonly fieldName: string;

    constructor(parent: Filter<TParentObject>, fieldName: string) {
        this.parent = parent;
        this.fieldName = fieldName;
    }

    predicate = (value: TProperty, predicate: Predicate): Filter<TParentObject> => {
        return this.parent.predicate(
            this.fieldName,
            value,
            predicate,
        );
    }

    then = <TNestedField extends keyof TProperty>(fieldName: TNestedField): FieldFilter<TParentObject, TProperty[TNestedField]> =>
        new FieldFilter<TParentObject, TProperty[TNestedField]>(this.parent, `${this.fieldName}.${fieldName as string}`);

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
