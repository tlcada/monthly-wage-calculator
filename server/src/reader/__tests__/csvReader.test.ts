import {suite, test} from "mocha-typescript";
import CsvReader from '../CsvReader';

const chai = require('chai');
const expect = chai.expect;
chai.use(require('chai-fs'));

@suite('CSV Reader')
class CsvReaderTest {
    private csvReader: CsvReader;

    constructor() {
        this.csvReader = new CsvReader(['personName', 'personId', 'date', 'startTime', 'endTime']);
    }

    @test('Whether the path exists')
    expect_to_be_path(done: Function) {
        expect('./files/hour_lists/').to.be.a.path('not exist');
        done();
    }

    @test('Directory can not be empty')
    expect_can_not_be_empty(done: Function) {
        expect('./files/hour_lists/').to.be.a.directory('directory is empty').and.not.empty;
        done();
    }

    @test('Read CSV file content and test new JSON keys')
    should_be_content(done: Function) {
        let parsedCsvData: Array<CsvJsonKeys> = this.csvReader.readFilesFromDirectory<CsvJsonKeys>('./files/hour_lists/');
        expect(parsedCsvData).to.be.a('array');
        expect(parsedCsvData[0]).to.have.property('personName');
        expect(parsedCsvData[0]).to.have.property('personId');
        expect(parsedCsvData[0]).to.have.property('date');
        expect(parsedCsvData[0]).to.have.property('startTime');
        expect(parsedCsvData[0]).to.have.property('endTime');
        done();
    }
}