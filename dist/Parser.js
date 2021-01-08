"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
var Parser = /** @class */ (function () {
    function Parser() {
    }
    Parser.prototype.parse = function (str) {
        var exploded = str.trim().split('type');
        var data = {};
        for (var i = 1; i < exploded.length; i++) {
            var gqlType = exploded[i];
            var contentInsideBrance = this.getDataInsideCurlyBrace(gqlType);
            var key = contentInsideBrance[0];
            data[key] = contentInsideBrance[1];
        }
        return data;
    };
    Parser.prototype.parsePayload = function (str) {
        var parsedObj = graphql_1.parse(str);
        return this.convertSelectionsToData(parsedObj.definitions[0]['selectionSet']['selections'], true);
    };
    Parser.prototype.convertSelectionsToData = function (selections, parent) {
        if (parent === void 0) { parent = false; }
        var data = [];
        for (var i = 0; i < selections.length; i++) {
            var selection = selections[i];
            if (selection.selectionSet !== undefined) {
                data.push({
                    key: selection.name.value,
                    children: this.convertSelectionsToData(selection.selectionSet.selections),
                });
                continue;
            }
            data.push({
                key: selection.name.value,
                children: undefined,
            });
        }
        return parent ? data[0] : data;
    };
    Parser.prototype.convertDataInsideCurlyBranceIntoStructure = function (str) {
        var strArray = str.split('\n');
        var output = {};
        for (var i = 0; i < strArray.length; i++) {
            var explode = strArray[i].split(':');
            var lastItem = explode.pop();
            var name_1 = explode[0].trim().firstWord();
            output[name_1] = lastItem.trim();
        }
        return output;
    };
    Parser.prototype.getDataInsideCurlyBrace = function (str) {
        var data = str.split('{');
        var key = data[0].trim();
        var insideCurlyBrace = data[1].replace('}', '').trim();
        return [
            key, this.convertDataInsideCurlyBranceIntoStructure(insideCurlyBrace)
        ];
    };
    return Parser;
}());
exports.default = Parser;
//# sourceMappingURL=Parser.js.map