export type Predicate =
    | "contains"
    | "equals"
    | "less-than"
    | "less-than-or-equal"
    | "greater-than"
    | "greater-than-or-equal"
    | "starts-with"
    | "ends-with";

export interface FilterCondition<T> {
    field: keyof T;
    predicate: Predicate;
    value: any;
}

class Filter<T> {
    private readonly conditions: Array<FilterCondition<T>> = [];

    field = <K extends keyof T>(field: K): FieldFilter<T, T[K]> =>
        new FieldFilter<T, T[K]>(this, field);

    query = (): Array<FilterCondition<T>> => this.conditions;

    predicate = <K extends keyof T>(field: K, value: any, predicate: Predicate): Filter<T> => {
        this.conditions.push({
            field,
            predicate,
            value,
        });

        return this;
    }
}

class FieldFilter<T, K> {
    private readonly parent: Filter<T>;
    private readonly field: keyof T;

    constructor(parent: Filter<T>, field: keyof T) {
        this.parent = parent;
        this.field = field;
    }

    predicate = (value: K, predicate: Predicate): Filter<T> => {
        return this.parent.predicate(
            this.field,
            value,
            predicate,
        );
    }

    contains = (value: K): Filter<T> =>
        this.predicate(value, "contains");

    equals = (value: K): Filter<T> =>
        this.predicate(value, "equals");

    lessThan = (value: K): Filter<T> =>
        this.predicate(value, "less-than");

    lessThanOrEqual = (value: K): Filter<T> =>
        this.predicate(value, "less-than-or-equal");

    greaterThan = (value: K): Filter<T> =>
        this.predicate(value, "greater-than");

    greaterThanOrEqual = (value: K): Filter<T> =>
        this.predicate(value, "greater-than-or-equal");

    startsWith = (value: K): Filter<T> =>
        this.predicate(value, "starts-with");

    endsWith = (value: K): Filter<T> =>
        this.predicate(value, "ends-with");
}

export default <T>() => new Filter<T>();
