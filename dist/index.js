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
        this.payLoadBuild = this.parser.parsePayload(query);
    };
    Build.prototype.transform = function (graphStr) {
        var _a;
        if (this.isBuild === false) {
            this.build();
        }
        this.buildQuery(graphStr);
        var data = this.payLoadBuild;
        var key = data.key;
        data = {
            data: (_a = {},
                _a[key] = this.fillData(this.payLoadBuild.children, this.findInQuery(key)),
                _a)
        };
        console.log(data);
        return data;
    };
    Build.prototype.fillData = function (data, parent) {
        var dataReturn = {};
        for (var i = 0; i < data.length; i++) {
            var datum = data[i];
            if (datum.children === undefined) {
                dataReturn[datum.key] = this.generate(parent[datum.key]);
                continue;
            }
            var type = this.resolveType(parent[datum.key]);
            if (type.multiple === false) {
                dataReturn[datum.key] = this.fillData(datum.children, type.type);
            }
            else {
                dataReturn[datum.key] = [];
                for (var j = 0; i <= Math.floor(Math.random() * 10);) {
                    dataReturn[datum.key].push(this.fillData(datum.children, type.type));
                }
            }
        }
        return dataReturn;
    };
    Build.prototype.resolveType = function (key) {
        var multiple = false;
        if (key.startsWith('[')) {
            key = key.replace('[', '');
            key = key.replace(']', '');
            multiple = true;
        }
        return {
            type: this.graphBuild[key],
            multiple: multiple
        };
    };
    Build.prototype.findInQuery = function (key) {
        var Query = this.graphBuild.Query[key];
        return this.graphBuild[Query];
    };
    Build.prototype.generate = function (source) {
        var value = null;
        switch (source.toUpperCase()) {
            case 'STRING' || 'STRING!': {
                value = 'Rishabh';
                break;
            }
            case 'INTEGER' || 'INTEGER!': {
                value = 10;
                break;
            }
            case 'BOOLEAN': {
                value = true;
                break;
            }
            case 'FLOAT': {
                value = 1.11;
                break;
            }
            case 'DECIMAL': {
                value = 2.22;
                break;
            }
            default: {
                value = undefined;
            }
        }
        return value;
    };
    return Build;
}());
var buildOb = new Build("\ntype Query {\n\thuman(id: ID!): Human\n\tepisode: Episode\n}\n\ntype Human {\n\tname: String\n\tappearsIn: [Episode]\n\tstarships: [Starship]\n}\n\ntype Episode {\n\tid: Integer\n\tname: String\n}\n\ntype Starship {\n\tname: String\n}\n");
buildOb.transform("{\n\thuman(id: 1002) {\n\t  name\n\t  appearsIn {\n\t\t  id\n\t\t  name\n\t  }\n\t  starships {\n\t\t  name\n\t  }\n\t}}");
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