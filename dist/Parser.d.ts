declare class Parser {
    parse(str: string): {
        [x: string]: {
            name: string;
            type: string;
        }[];
    }[];
    convertDataInsideCurlyBranceIntoStructure(str: string): {
        name: string;
        type: string;
    }[];
    getDataInsideCurlyBrace(str: string): {
        [x: string]: {
            name: string;
            type: string;
        }[];
    };
}
export default Parser;
