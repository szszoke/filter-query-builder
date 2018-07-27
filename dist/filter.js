"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Filter = /** @class */ (function () {
    function Filter() {
        this.conditions = [];
    }
    Filter.prototype.field = function (fieldName) {
        return new FieldFilter(this, fieldName);
    };
    Filter.prototype.query = function () {
        return this.conditions;
    };
    Filter.prototype.predicate = function (fieldName, predicate, value, values) {
        this.conditions.push({
            fieldName: fieldName,
            predicate: predicate,
            value: value,
            values: values,
        });
        return this;
    };
    return Filter;
}());
exports.Filter = Filter;
var FieldFilter = /** @class */ (function () {
    function FieldFilter(parent, fieldName) {
        this.parent = parent;
        this.fieldName = fieldName;
    }
    FieldFilter.prototype.predicate = function (predicate, value, values) {
        return this.parent.predicate(this.fieldName, predicate, value, values);
    };
    FieldFilter.prototype.then = function (fieldName) {
        return new FieldFilter(this.parent, this.fieldName + "." + fieldName);
    };
    FieldFilter.prototype.contains = function (value) {
        return this.predicate("contains", value);
    };
    FieldFilter.prototype.equal = function (value) {
        return this.predicate("equal", value);
    };
    FieldFilter.prototype.doesNotEqual = function (value) {
        return this.predicate("doesNotEqual", value);
    };
    FieldFilter.prototype.lessThan = function (value) {
        return this.predicate("lessThan", value);
    };
    FieldFilter.prototype.lessThanOrEqual = function (value) {
        return this.predicate("lessThanOrEqual", value);
    };
    FieldFilter.prototype.greaterThan = function (value) {
        return this.predicate("greaterThan", value);
    };
    FieldFilter.prototype.greaterThanOrEqual = function (value) {
        return this.predicate("greaterThanOrEqual", value);
    };
    FieldFilter.prototype.startsWith = function (value) {
        return this.predicate("startsWith", value);
    };
    FieldFilter.prototype.endsWith = function (value) {
        return this.predicate("endsWith", value);
    };
    FieldFilter.prototype.oneOf = function (values) {
        return this.predicate("oneOf", undefined, values);
    };
    return FieldFilter;
}());
exports.FieldFilter = FieldFilter;
exports.default = (function () { return new Filter(); });
