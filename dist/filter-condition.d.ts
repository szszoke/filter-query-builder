import { Predicate } from "./predicate";
export interface IFilterCondition {
    fieldName: string;
    predicate: Predicate;
    value?: any;
    values?: any[];
}
