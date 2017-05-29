import {suite, test} from "mocha-typescript";
import Logger from '../Logger';

const fs = require('fs');
const chai = require('chai');
const assert = chai.assert;
chai.use(require('chai-fs'));

@suite('Logger')
class LoggerTest {
    private logger: Logger;

    constructor() {
        this.logger = new Logger(true);
    }

    @test('Write an error msg to error.log file')
    assert_file_content(done: Function) {
        const logFile: string = './logs/error.log';
        if (fs.existsSync(logFile)) {
            fs.unlinkSync(logFile);
        }
        this.logger.error('Test an error message', {details: 'logger test'});
        setTimeout(() => {
            assert.notIsEmptyFile('./logs/error.log', 'file content is empty');
            done();
        }, 10);
    }
}