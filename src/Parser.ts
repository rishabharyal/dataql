import {parse} from 'graphql';

class Parser {
    parse(str: string) {
        let exploded = str.trim().split('type');
        let data = {};
        for(let i = 1;i<exploded.length;i++) {
            let gqlType = exploded[i];
            let contentInsideBrance = this.getDataInsideCurlyBrace(gqlType);
            let key = contentInsideBrance[0];
            data[key] = contentInsideBrance[1];
        }

        return data;
    }

    parsePayload(str: string) {
        let parsedObj = parse(str);
        return this.convertSelectionsToData(parsedObj.definitions[0]['selectionSet']['selections'], true);
    }

    convertSelectionsToData(selections: Array<Object>, parent:boolean = false):any {
        let data = [];
        for(let i=0;i<selections.length;i++) {
            let selection = selections[i];
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
    }

    convertDataInsideCurlyBranceIntoStructure(str: string) {
        let strArray = str.split('\n');
        let output = {};
        for(let i = 0; i< strArray.length; i++) {
            let explode = strArray[i].split(':');
            let lastItem = explode.pop();
            let name = explode[0].trim().firstWord();
            output[name] = lastItem.trim();
        }

        return output;
    }

    getDataInsideCurlyBrace(str: string) {
        let data = str.split('{');
        let key = data[0].trim();
        let insideCurlyBrace = data[1].replace('}', '').trim();
        return [
            key, this.convertDataInsideCurlyBranceIntoStructure(insideCurlyBrace)
        ];
    }
}

export default Parser;