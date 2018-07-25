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
        this.predicate = function (fieldName, value, predicate) {
            _this.conditions.push({
                fieldName: fieldName,
                predicate: predicate,
                value: value,
            });
            return _this;
        };
    }
    return Filter;
}());
var FieldFilter = /** @class */ (function () {
    function FieldFilter(parent, fieldName) {
        var _this = this;
        this.predicate = function (value, predicate) {
            return _this.parent.predicate(_this.fieldName, value, predicate);
        };
        this.then = function (fieldName) {
            return new FieldFilter(_this.parent, _this.fieldName + "." + fieldName);
        };
        this.contains = function (value) {
            return _this.predicate(value, "contains");
        };
        this.equal = function (value) {
            return _this.predicate(value, "equal");
        };
        this.doesNotEqual = function (value) {
            return _this.predicate(value, "doesNotEqual");
        };
        this.lessThan = function (value) {
            return _this.predicate(value, "lessThan");
        };
        this.lessThanOrEqual = function (value) {
            return _this.predicate(value, "lessThanOrEqual");
        };
        this.greaterThan = function (value) {
            return _this.predicate(value, "greaterThan");
        };
        this.greaterThanOrEqual = function (value) {
            return _this.predicate(value, "greaterThanOrEqual");
        };
        this.startsWith = function (value) {
            return _this.predicate(value, "startsWith");
        };
        this.endsWith = function (value) {
            return _this.predicate(value, "endsWith");
        };
        this.parent = parent;
        this.fieldName = fieldName;
    }
    return FieldFilter;
}());
exports.default = (function () { return new Filter(); });
