import filter from ".";
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

    expect(query).to.deep.equal([
      {
        fieldName: "stringField",
        predicate: "contains",
        value: "hello world",
        values: undefined,
      },
    ]);
  });

  it("equal query", () => {
    const query = filter<ITestObject>()
      .field("stringField")
      .equal("hello world")
      .query();

    expect(query).to.deep.equal([
      {
        fieldName: "stringField",
        predicate: "equal",
        value: "hello world",
        values: undefined,
      },
    ]);
  });

  it("does not equal query", () => {
    const query = filter<ITestObject>()
      .field("stringField")
      .doesNotEqual("hello world")
      .query();

    expect(query).to.deep.equal([
      {
        fieldName: "stringField",
        predicate: "doesNotEqual",
        value: "hello world",
        values: undefined,
      },
    ]);
  });

  it("less-than query", () => {
    const query = filter<ITestObject>()
      .field("numberField")
      .lessThan(1)
      .query();

    expect(query).to.deep.equal([
      {
        fieldName: "numberField",
        predicate: "lessThan",
        value: 1,
        values: undefined,
      },
    ]);
  });

  it("less-than-or-equal query", () => {
    const query = filter<ITestObject>()
      .field("numberField")
      .lessThanOrEqual(1)
      .query();

    expect(query).to.deep.equal([
      {
        fieldName: "numberField",
        predicate: "lessThanOrEqual",
        value: 1,
        values: undefined,
      },
    ]);
  });

  it("greater-than query", () => {
    const query = filter<ITestObject>()
      .field("numberField")
      .greaterThan(1)
      .query();

    expect(query).to.deep.equal([
      {
        fieldName: "numberField",
        predicate: "greaterThan",
        value: 1,
        values: undefined,
      },
    ]);
  });

  it("greater-than-or-equal query", () => {
    const query = filter<ITestObject>()
      .field("numberField")
      .greaterThanOrEqual(1)
      .query();

    expect(query).to.deep.equal([
      {
        fieldName: "numberField",
        predicate: "greaterThanOrEqual",
        value: 1,
        values: undefined,
      },
    ]);
  });

  it("starts-with query", () => {
    const query = filter<ITestObject>()
      .field("stringField")
      .startsWith("hello world")
      .query();

    expect(query).to.deep.equal([
      {
        fieldName: "stringField",
        predicate: "startsWith",
        value: "hello world",
        values: undefined,
      },
    ]);
  });

  it("ends-with query", () => {
    const query = filter<ITestObject>()
      .field("stringField")
      .endsWith("hello world")
      .query();

    expect(query).to.deep.equal([
      {
        fieldName: "stringField",
        predicate: "endsWith",
        value: "hello world",
        values: undefined,
      },
    ]);
  });

  it("oneOf query", () => {
    const query = filter<ITestObject>()
      .field("numberField")
      .oneOf([1, 2])
      .query();

    expect(query).to.deep.equal([
      {
        fieldName: "numberField",
        predicate: "oneOf",
        value: undefined,
        values: [1, 2],
      },
    ]);
  });

  it("nested oneOf query", () => {
    const query = filter<ITestObject>()
      .field("foo")
      .then("bar")
      .oneOf(["hello", "world"])
      .query();

    expect(query).to.deep.equal([
      {
        fieldName: "foo.bar",
        predicate: "oneOf",
        value: undefined,
        values: ["hello", "world"],
      },
    ]);
  });

  it("nested contains query", () => {
    const query = filter<ITestObject>()
      .field("foo")
      .then("bar")
      .contains("test")
      .query();

    expect(query).to.deep.equal([
      {
        fieldName: "foo.bar",
        predicate: "contains",
        value: "test",
        values: undefined,
      },
    ]);
  });
});
