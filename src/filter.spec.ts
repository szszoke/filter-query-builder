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
            fieldName: "stringField",
            predicate: "contains",
            value: "hello world",
        }]);
    });

    it("equal query", () => {
        const query = filter<ITestObject>()
            .field("stringField")
            .equal("hello world")
            .query();

        expect(query).to.deep.equal([{
            fieldName: "stringField",
            predicate: "equal",
            value: "hello world",
        }]);
    });

    it("does not equal query", () => {
        const query = filter<ITestObject>()
            .field("stringField")
            .doesNotEqual("hello world")
            .query();

        expect(query).to.deep.equal([{
            fieldName: "stringField",
            predicate: "doesNotEqual",
            value: "hello world",
        }]);
    });

    it("less-than query", () => {
        const query = filter<ITestObject>()
            .field("numberField")
            .lessThan(1)
            .query();

        expect(query).to.deep.equal([{
            fieldName: "numberField",
            predicate: "lessThan",
            value: 1,
        }]);
    });

    it("less-than-or-equal query", () => {
        const query = filter<ITestObject>()
            .field("numberField")
            .lessThanOrEqual(1)
            .query();

        expect(query).to.deep.equal([{
            fieldName: "numberField",
            predicate: "lessThanOrEqual",
            value: 1,
        }]);
    });

    it("greater-than query", () => {
        const query = filter<ITestObject>()
            .field("numberField")
            .greaterThan(1)
            .query();

        expect(query).to.deep.equal([{
            fieldName: "numberField",
            predicate: "greaterThan",
            value: 1,
        }]);
    });

    it("greater-than-or-equal query", () => {
        const query = filter<ITestObject>()
            .field("numberField")
            .greaterThanOrEqual(1)
            .query();

        expect(query).to.deep.equal([{
            fieldName: "numberField",
            predicate: "greaterThanOrEqual",
            value: 1,
        }]);
    });

    it("starts-with query", () => {
        const query = filter<ITestObject>()
            .field("stringField")
            .startsWith("hello world")
            .query();

        expect(query).to.deep.equal([{
            fieldName: "stringField",
            predicate: "startsWith",
            value: "hello world"
        }]);
    });

    it("ends-with query", () => {
        const query = filter<ITestObject>()
            .field("stringField")
            .endsWith("hello world")
            .query();

        expect(query).to.deep.equal([{
            fieldName: "stringField",
            predicate: "endsWith",
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
            fieldName: "foo.bar",
            predicate: "contains",
            value: "test"
        }]);
    });
});
