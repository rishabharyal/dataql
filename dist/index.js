"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
String.prototype.firstWord = function () { return this.replace(/\(.*/, ''); };
var Parser_1 = __importDefault(require("./Parser"));
var Build = /** @class */ (function () {
    function Build(graph) {
        if (graph === void 0) { graph = ""; }
        this.graph = "";
        this.graphBuild = {};
        this.payLoadBuild = {};
        this.isBuild = false;
        this.graph = graph;
        this.parser = new Parser_1.default();
    }
    Build.prototype.build = function () {
        this.graphBuild = this.parser.parse(this.graph);
        this.isBuild = true;
    };
    Build.prototype.buildQuery = function (query) {
        this.payLoadBuild = this.parser.parse(query);
    };
    Build.prototype.transform = function (graphStr) {
        if (this.isBuild === false) {
            this.build();
        }
        this.buildQuery(graphStr);
        var returnData = [];
        return true;
    };
    Build.prototype.generate = function (str) {
        str = str.toUpperCase();
        var value = null;
        switch (str) {
            case 'STRING': {
                value = 'Rishabh';
            }
            case 'INTEGER': {
                value = 10;
            }
            case 'BOOLEAN': {
                value = true;
            }
            case 'FLOAT': {
                value = 1.11;
            }
            case 'DECIMAL': {
                value = 2.22;
            }
            case 'INSIDE': {
                // handle the objects and stuffs...
            }
        }
        return value;
    };
    Build.prototype.log = function () {
        console.log(this.graph);
    };
    return Build;
}());
var buildOb = new Build("\ntype Query {\n\thuman(id: ID!): Human\n}\n\ntype Human {\n\tname: String\n\tappearsIn: [Episode]\n\tstarships: [Starship]\n}\n\ntype Episode {\n\tname: String\n}\n\ntype Starship {\n\tname: String\n}\n");
console.log(buildOb.transform("{\n\thuman(id: 1002) {\n\t  name\n\t  appearsIn\n\t  starships {\n\t\tname\n\t  }\n\t}\n  }"));
// should return like this:
/**
 * {
"data": {
  "human": {
    "name": "Han Solo",
    "appearsIn": [
      "NEWHOPE",
      "EMPIRE",
      "JEDI"
    ],
    "starships": [
      {
        "name": "Millenium Falcon"
      },
      {
        "name": "Imperial shuttle"
      }
    ]
  }
}
}
 */
//# sourceMappingURL=index.js.map