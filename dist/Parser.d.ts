declare class Parser {
    parse(str: string): {};
    parsePayload(str: string): any;
    convertSelectionsToData(selections: Array<Object>, parent?: boolean): any;
    convertDataInsideCurlyBranceIntoStructure(str: string): {};
    getDataInsideCurlyBrace(str: string): {}[];
}
export default Parser;
