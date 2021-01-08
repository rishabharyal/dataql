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
		this.payLoadBuild = this.parser.parsePayload(query);
	}

    transform(graphStr: string) {
		if (this.isBuild === false) {
			this.build();
		}

		this.buildQuery(graphStr);

		let data = this.payLoadBuild;
		let key = data.key;


		data = {
			data: {
				[key]: this.fillData(this.payLoadBuild.children, this.findInQuery(key))
			}
		}

		console.log(data);

		return data;
	}

	fillData(data: Array<Object>, parent: Object) {
		let dataReturn = {};
		for(let i=0; i<data.length;i++) {
			let datum = data[i];
			if (datum.children === undefined) {
				dataReturn[datum.key] = this.generate(parent[datum.key]);
				continue;
			}

			let type = this.resolveType(parent[datum.key]);
			if (type.multiple === false) {
				dataReturn[datum.key] = this.fillData(datum.children, type.type);
			} else {
				dataReturn[datum.key] = [];
				for(let j=0;i<=Math.floor(Math.random() * 10)) {
					dataReturn[datum.key].push(this.fillData(datum.children, type.type));
				}
			}
		}

		return dataReturn;
		
	}

	resolveType(key: String) {
		let multiple = false;
		if (key.startsWith('[')) {
			key = key.replace('[', '');
			key = key.replace(']', '');
			multiple = true;
		}

		return {
			type: this.graphBuild[key],
			multiple
		};
	}

	findInQuery(key: string) {		
		let Query = this.graphBuild.Query[key];
		return this.graphBuild[Query];
	}
	
	generate(source: string) {
		let value = null;
		switch(source.toUpperCase()) {
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
	}
}

let buildOb = new Build(`
type Query {
	human(id: ID!): Human
	episode: Episode
}

type Human {
	name: String
	appearsIn: Episode
	starships: [Starship]
}

type Episode {
	id: Integer
	name: String
}

type Starship {
	name: String
}
`);

buildOb.transform(`{
	human(id: 1002) {
	  name
	  appearsIn {
		  id
		  name
	  }
	  starships {
		  name
	  }
	}}`);

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
