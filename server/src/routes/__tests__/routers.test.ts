'use strict';

import {suite, test} from "mocha-typescript";

const server = require("../../server");
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
chai.use(chaiHttp);

@suite('Wage Router')
class RouterTest {
    @test('Should list ALL wages on /api/wage GET')
    wage_get(done: Function) {
        chai.request(server.listen())
            .get('/api/wage')
            .end((err, res) => {
                should.not.exist(err);
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    }
}