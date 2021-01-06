class Parser {
    parse(str: string) {
        let exploded = str.trim().split('type');
        let data = [];
        for(let i = 1;i<exploded.length;i++) {
            let gqlType = exploded[i];
            let contentInsideBrance = this.getDataInsideCurlyBrace(gqlType);
            data.push(contentInsideBrance);
        }

        return data;
    }

    convertDataInsideCurlyBranceIntoStructure(str: string) {
        let strArray = str.split('\n');
        let output = [];
        for(let i = 0; i< strArray.length; i++) {
            let explode = strArray[i].split(':');
            output.push({
                name: explode[0].trim().firstWord(),
                type: explode[1].trim(),
            });
        }

        return output;
    }

    getDataInsideCurlyBrace(str: string) {
        let data = str.split('{');
        let key = data[0].trim();
        let insideCurlyBrace = data[1].replace('}', '').trim();
        return {
            [key]: this.convertDataInsideCurlyBranceIntoStructure(insideCurlyBrace)
        };
    }
}

export default Parser;