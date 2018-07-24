import filter from "./filter";
import { expect } from "chai";

interface INestedObject {
    bar: string;
}

interface ITestObject {
    stringField: string;
    numberField: number;
    foo: INestedObject;
}

describe("filter", () => {
    it("contains query", () => {
        const query = filter<ITestObject>()
            .field("stringField")
            .contains("hello world")
            .query();

        expect(query).to.deep.equal([{
            field: "stringField",
            predicate: "contains",
            value: "hello world",
        }]);
    });

    it("equals query", () => {
        const query = filter<ITestObject>()
            .field("stringField")
            .equals("hello world")
            .query();

        expect(query).to.deep.equal([{
            field: "stringField",
            predicate: "equals",
            value: "hello world",
        }]);
    });

    it("less-than query", () => {
        const query = filter<ITestObject>()
            .field("numberField")
            .lessThan(1)
            .query();

        expect(query).to.deep.equal([{
            field: "numberField",
            predicate: "less-than",
            value: 1,
        }]);
    });

    it("less-than-or-equal query", () => {
        const query = filter<ITestObject>()
            .field("numberField")
            .lessThanOrEqual(1)
            .query();

        expect(query).to.deep.equal([{
            field: "numberField",
            predicate: "less-than-or-equal",
            value: 1,
        }]);
    });

    it("greater-than query", () => {
        const query = filter<ITestObject>()
            .field("numberField")
            .greaterThan(1)
            .query();

        expect(query).to.deep.equal([{
            field: "numberField",
            predicate: "greater-than",
            value: 1,
        }]);
    });

    it("greater-than-or-equal query", () => {
        const query = filter<ITestObject>()
            .field("numberField")
            .greaterThanOrEqual(1)
            .query();

        expect(query).to.deep.equal([{
            field: "numberField",
            predicate: "greater-than-or-equal",
            value: 1,
        }]);
    });

    it("starts-with query", () => {
        const query = filter<ITestObject>()
            .field("stringField")
            .startsWith("hello world")
            .query();

        expect(query).to.deep.equal([{
            field: "stringField",
            predicate: "starts-with",
            value: "hello world"
        }]);
    });

    it("ends-with query", () => {
        const query = filter<ITestObject>()
            .field("stringField")
            .endsWith("hello world")
            .query();

        expect(query).to.deep.equal([{
            field: "stringField",
            predicate: "ends-with",
            value: "hello world"
        }]);
    });

    it("nested contains query", () => {
        const query = filter<ITestObject>()
            .field("foo")
            .then("bar")
            .contains("test")
            .query();
        
        expect(query).to.deep.equal([{
            field: "foo.bar",
            predicate: "contains",
            value: "test"
        }]);
    });
});
