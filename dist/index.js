"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Parser_1 = __importDefault(require("./Parser"));
var Build = /** @class */ (function () {
    function Build(graph) {
        if (graph === void 0) { graph = ""; }
        this.graph = "";
        this.graphBuild = {};
        this.isBuild = false;
        this.graph = graph;
        this.parser = new Parser_1.default();
    }
    Build.prototype.build = function () {
        this.graphBuild = this.parser.parse(this.graph);
        this.isBuild = true;
    };
    Build.prototype.transform = function (graphStr) {
        if (this.isBuild === false) {
            this.build();
        }
        return {
            success: true
        };
    };
    Build.prototype.log = function () {
        console.log(this.graph);
    };
    return Build;
}());
var buildOb = new Build("type User {\n    id: String\n\tname: String\n  }\n\n  type Product {\n\t  id: String\n\t  name: String,\n\t  price: Decimal,\n\t  isSpecial: Boolean\n  }\n");
console.log(buildOb.transform("type Query {\n    user(id: String): User\n  }\n"));
//# sourceMappingURL=index.js.map