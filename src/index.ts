declare global {
	interface String {
	  firstWord(): string;
	}
  }
String.prototype.firstWord = function(){return this.replace(/\(.*/,'')};

import Parser from './Parser';

class Build {
	private graph:string = "";
	private parser:Parser;
	private graphBuild:Object = {};
	private payLoadBuild:Object = {};
    private isBuild:boolean = false;

    constructor(graph: string = "") {
		this.graph = graph
		this.parser = new Parser()
    }

    build() {
		this.graphBuild = this.parser.parse(this.graph);
		this.isBuild = true;
	}
	
	buildQuery(query: string) {
		this.payLoadBuild = this.parser.parse(query);
	}

    transform(graphStr: string) {
		if (this.isBuild === false) {
			this.build();
		}

		this.buildQuery(graphStr);

		let returnData = [];





		return true;
	}
	
	generate(str: string) {
		str = str.toUpperCase();
		let value = null;
		switch(str) {
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
	}

    log() {
        console.log(this.graph);
    }
}

let buildOb = new Build(`
type Query {
	human(id: ID!): Human
}

type Human {
	name: String
	appearsIn: [Episode]
	starships: [Starship]
}

type Episode {
	name: String
}

type Starship {
	name: String
}
`);

console.log(buildOb.transform(`{
	human(id: 1002) {
	  name
	  appearsIn
	  starships {
		name
	  }
	}
  }`));

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
