'use strict';

import * as fs from 'fs';
import * as parse from 'csv-parse/lib/sync';

/**
 * Read csv files from directory and convert csv data to JSON object
 */
class CsvReader {
    private newJsonKeys: Array<string>;

    constructor(jsonKeys?: Array<string>) {
        this.newJsonKeys = jsonKeys;
    }

    public readFilesFromDirectory<T>(directory: string): Array<T> {
        let jsonObjects: Array<T> = [];

        const files: Array<string> = fs.readdirSync(directory);
        files.forEach(file => {
            let rawData = fs.readFileSync(directory + file).toString();
            let content: Array<T> = parse(rawData, {columns: this.newJsonKeys, delimiter: ',', skip_empty_lines: true, from: 2});
            content.forEach(jsonObject => {
                jsonObjects.push(jsonObject);
            })
        });

        return jsonObjects;
    }
}

export default CsvReader;