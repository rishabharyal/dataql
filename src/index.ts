import Parser from './Parser';
class Build {
	private graph:string = "";
	private parser:Parser;
    private graphBuild:Object = {};
    private isBuild:boolean = false;

    constructor(graph: string = "") {
		this.graph = graph
		this.parser = new Parser()
    }

    build() {
		this.graphBuild = this.parser.parse(this.graph);
		this.isBuild = true;
    }

    transform(graphStr: string) {
		if (this.isBuild === false) {
			this.build();
		}

		return {
			success: true
		};
    }

    log() {
        console.log(this.graph);
    }
}

let buildOb = new Build(`type User {
    id: String
	name: String
  }

  type Product {
	  id: String
	  name: String,
	  price: Decimal,
	  isSpecial: Boolean
  }
`);

console.log(buildOb.transform(`type Query {
    user(id: String): User
  }
`));
