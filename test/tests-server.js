const chai = require('chai');
const chaiHttp = require('chai-http');

const {
    app, runServer, closeServer
} = require('../server');

const should = chai.should();

chai.use(chaiHttp);

describe('my test', function () {


    it('should print hello world', function () {
        return chai.request(app, function (res) {
            res.should.have.status(200);
            res.body.length.should.be.above(0);
        });
    });
});
