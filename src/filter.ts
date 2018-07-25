export type Predicate =
    | "contains"
    | "equal"
    | "doesNotEqual"
    | "lessThan"
    | "lessThanOrEqual"
    | "greaterThan"
    | "greaterThanOrEqual"
    | "startsWith"
    | "endsWith"
    | "oneOf";

export interface FilterCondition {
    fieldName: string;
    predicate: Predicate;
    value?: any;
    values?: any[];
}

class Filter<TObject> {
    private readonly conditions: Array<FilterCondition> = [];

    field = <TProperty extends keyof TObject>(fieldName: TProperty): FieldFilter<TObject, TObject[TProperty]> =>
        new FieldFilter<TObject, TObject[TProperty]>(this, fieldName as string);

    query = (): Array<FilterCondition> => this.conditions;

    predicate = (
        fieldName: string,
        predicate: Predicate,
        value?: any,
        values?: any[],
    ): Filter<TObject> => {
        this.conditions.push({
            fieldName,
            predicate,
            value,
            values,
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

    predicate = (
        predicate: Predicate,
        value?: TProperty,
        values?: Array<TProperty>,
    ): Filter<TParentObject> => {
        return this.parent.predicate(
            this.fieldName,
            predicate,
            value,
            values,
        );
    }

    then = <TNestedField extends keyof TProperty>(fieldName: TNestedField): FieldFilter<TParentObject, TProperty[TNestedField]> =>
        new FieldFilter<TParentObject, TProperty[TNestedField]>(this.parent, `${this.fieldName}.${fieldName as string}`);

    contains = (value: TProperty): Filter<TParentObject> =>
        this.predicate("contains", value);

    equal = (value: TProperty): Filter<TParentObject> =>
        this.predicate("equal", value);
    
    doesNotEqual = (value: TProperty): Filter<TParentObject> =>
        this.predicate("doesNotEqual", value);

    lessThan = (value: TProperty): Filter<TParentObject> =>
        this.predicate("lessThan", value);

    lessThanOrEqual = (value: TProperty): Filter<TParentObject> =>
        this.predicate("lessThanOrEqual", value);

    greaterThan = (value: TProperty): Filter<TParentObject> =>
        this.predicate("greaterThan", value);

    greaterThanOrEqual = (value: TProperty): Filter<TParentObject> =>
        this.predicate("greaterThanOrEqual", value);

    startsWith = (value: TProperty): Filter<TParentObject> =>
        this.predicate("startsWith", value);

    endsWith = (value: TProperty): Filter<TParentObject> =>
        this.predicate("endsWith", value);
    
    oneOf = (values: TProperty[]): Filter<TParentObject> =>
        this.predicate("oneOf", undefined, values);
}

export default <T>() => new Filter<T>();
