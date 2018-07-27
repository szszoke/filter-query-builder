"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var filter_1 = require("./filter");
var PromisifiedFilter = /** @class */ (function (_super) {
    __extends(PromisifiedFilter, _super);
    function PromisifiedFilter(promiseCreator) {
        var _this = _super.call(this) || this;
        _this.promiseCreator = promiseCreator;
        return _this;
    }
    PromisifiedFilter.prototype.field = function (fieldName) {
        return new filter_1.FieldFilter(this, fieldName);
    };
    PromisifiedFilter.prototype.toPromise = function () {
        return this.promiseCreator(this.query());
    };
    return PromisifiedFilter;
}(filter_1.Filter));
exports.PromisifiedFilter = PromisifiedFilter;
exports.createFilterPromise = function (promiseCreator) {
    return new PromisifiedFilter(promiseCreator);
};
