"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Filter = /** @class */ (function () {
    function Filter() {
        var _this = this;
        this.conditions = [];
        this.field = function (fieldName) {
            return new FieldFilter(_this, fieldName);
        };
        this.query = function () { return _this.conditions; };
        this.predicate = function (fieldName, predicate, value, values) {
            _this.conditions.push({
                fieldName: fieldName,
                predicate: predicate,
                value: value,
                values: values,
            });
            return _this;
        };
    }
    return Filter;
}());
var FieldFilter = /** @class */ (function () {
    function FieldFilter(parent, fieldName) {
        var _this = this;
        this.predicate = function (predicate, value, values) {
            return _this.parent.predicate(_this.fieldName, predicate, value, values);
        };
        this.then = function (fieldName) {
            return new FieldFilter(_this.parent, _this.fieldName + "." + fieldName);
        };
        this.contains = function (value) {
            return _this.predicate("contains", value);
        };
        this.equal = function (value) {
            return _this.predicate("equal", value);
        };
        this.doesNotEqual = function (value) {
            return _this.predicate("doesNotEqual", value);
        };
        this.lessThan = function (value) {
            return _this.predicate("lessThan", value);
        };
        this.lessThanOrEqual = function (value) {
            return _this.predicate("lessThanOrEqual", value);
        };
        this.greaterThan = function (value) {
            return _this.predicate("greaterThan", value);
        };
        this.greaterThanOrEqual = function (value) {
            return _this.predicate("greaterThanOrEqual", value);
        };
        this.startsWith = function (value) {
            return _this.predicate("startsWith", value);
        };
        this.endsWith = function (value) {
            return _this.predicate("endsWith", value);
        };
        this.oneOf = function (values) {
            return _this.predicate("oneOf", undefined, values);
        };
        this.parent = parent;
        this.fieldName = fieldName;
    }
    return FieldFilter;
}());
exports.default = (function () { return new Filter(); });
