"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Parser = /** @class */ (function () {
    function Parser() {
    }
    Parser.prototype.parse = function (str) {
        var exploded = str.trim().split('type');
        for (var i = 1; i < exploded.length; i++) {
            var gqlType = exploded[i];
            var contentInsideBrance = this.getDataInsideCurlyBrace(gqlType);
            console.log(contentInsideBrance);
        }
        return {};
    };
    Parser.prototype.convertDataInsideCurlyBranceIntoStructure = function (str) {
        var strArray = str.split('\n');
        var output = [];
        for (var i = 0; i < strArray.length; i++) {
            var explode = strArray[i].split(':');
            output.push({
                name: explode[0].trim(),
                type: explode[1].trim(),
            });
        }
        return output;
    };
    Parser.prototype.getDataInsideCurlyBrace = function (str) {
        var _a;
        var data = str.split('{');
        var key = data[0].trim();
        var insideCurlyBrace = data[1].replace('}', '').trim();
        return _a = {},
            _a[key] = this.convertDataInsideCurlyBranceIntoStructure(insideCurlyBrace),
            _a;
    };
    return Parser;
}());
exports.default = Parser;
//# sourceMappingURL=Parser.js.map