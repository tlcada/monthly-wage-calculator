import {suite, test} from "mocha-typescript";
import WageCalculation from '../WageCalculation';

const chai = require('chai');
const expect = chai.expect;

@suite('Wage Calculation')
class WageCalculationTest {
    private wageCalculation: WageCalculation;

    constructor() {
        this.wageCalculation = new WageCalculation();
    }

    @test("Should pass if wages are right")
    asserts_pass(done: Function) {
        const monthlyWage = this.wageCalculation.getMonthlyWage();
        expect(monthlyWage).to.be.an('object');
        expect(monthlyWage['Janet Java']['3/2017']).to.equal(701.61);
        expect(monthlyWage['Scott Scala']['3/2017']).to.equal(657.34);
        expect(monthlyWage['Larry Lolcode']['3/2017']).to.equal(377.01);
        done();
    }
}