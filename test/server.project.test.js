var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var server = require('../server/index');
var should = chai.should();
var expect = chai.expect;

describe('Basic info and search GET requests', function () {
    it('should list ALL available sections and project types on /api/aroundInfo', function (done) {
        chai.request(server)
            .get('/api/aroundInfo')
            .set('token', 'Bearer testingToken')
            .end(function (err, res) {
                should.exist(res);
                res.should.be.an('object');
                res.body.should.have.property('sections');
                res.body.should.have.property('types');
                expect(res.body.sections).to.have.length.within(3,50);
                expect(res.body.types).to.have.length.within(3,5);
                res.should.have.status(200);
                done();
            });
    });
    it('should send error token not valid on /api/aroundInfo', function (done) {
        chai.request(server)
            .get('/api/aroundInfo')
            .set('token', 'Bearer testingTokenUnvalid')
            .end(function (err, res) {
                should.exist(res);
                res.should.have.status(420);
                done();
            });
    });
    it('should send error role not permitted on /api/aroundInfo', function (done) {
        chai.request(server)
            .get('/api/aroundInfo')
            .set('token', 'Bearer testingTokenNotPermitted')
            .end(function (err, res) {
                should.exist(res);
                res.should.have.status(420);
                done();
            });
    });
    it('should list ALL 5(max) first student corresponding to the search "a" on /api/studentSearch', function (done) {
        chai.request(server)
            .get('/api/studentSearch')
            .set('token', 'Bearer testingToken')
            .set('search', 'a')
            .end(function (err, res) {
                should.exist(res);
                res.should.be.an('object');
                res.body.should.have.property('students');
                expect(res.body.students).to.have.length.within(0,5);
                res.should.have.status(200);
                done();
            });
    });
    it('should list no student corresponding to the search "asdfsdfsdfsdf" on /api/studentSearch', function (done) {
        chai.request(server)
            .get('/api/studentSearch')
            .set('token', 'Bearer testingToken')
            .set('search', 'asdfsdfsdfsdf')
            .end(function (err, res) {
                should.exist(res);
                res.should.be.an('object');
                res.body.should.have.property('students');
                res.body.should.have.property('students').with.lengthOf(0)
                res.should.have.status(200);
                done();
            });
    });
    it('should send error token not valid on /api/studentSearch', function (done) {
        chai.request(server)
            .get('/api/studentSearch')
            .set('token', 'Bearer testingTokenUnvalid')
            .set('search', 'a')
            .end(function (err, res) {
                should.exist(res);
                res.should.have.status(420);
                done();
            });
    });
    it('should send error role not permitted on /api/studentSearch', function (done) {
        chai.request(server)
            .get('/api/studentSearch')
            .set('token', 'Bearer testingTokenNotPermitted')
            .set('search', 'a')
            .end(function (err, res) {
                should.exist(res);
                res.should.have.status(420);
                done();
            });
    });
    it('should list ALL 5(max) first teachers corresponding to the search "a" on /api/respSearch', function (done) {
        chai.request(server)
            .get('/api/respSearch')
            .set('token', 'Bearer testingToken')
            .set('search', 'a')
            .end(function (err, res) {
                should.exist(res);
                res.should.be.an('object');
                res.should.have.status(200);
                res.body.should.have.property('resp');
                expect(res.body.resp).to.have.length.within(0,5);
                done();
            });
    });
    it('should list no teacher corresponding to the search "asdfsdfsdfsdf" on /api/respSearch', function (done) {
        chai.request(server)
            .get('/api/respSearch')
            .set('token', 'Bearer testingToken')
            .set('search', 'asdfsdfsdfsdf')
            .end(function (err, res) {
                should.exist(res);
                res.should.be.an('object');
                res.body.should.have.property('resp');
                res.body.should.have.property('resp').with.lengthOf(0)
                res.should.have.status(200);
                done();
            });
    });
    it('should send error token not valid on /api/respSearch', function (done) {
        chai.request(server)
            .get('/api/respSearch')
            .set('token', 'Bearer testingTokenUnvalid')
            .set('search', 'a')
            .end(function (err, res) {
                should.exist(res);
                res.should.have.status(420);
                done();
            });
    });
    it('should send error role not permitted on /api/respSearch', function (done) {
        chai.request(server)
            .get('/api/respSearch')
            .set('token', 'Bearer testingTokenNotPermitted')
            .set('search', 'a')
            .end(function (err, res) {
                should.exist(res);
                res.should.have.status(420);
                done();
            });
    });
    it('should list ALL 5(max) first externe corresponding to the search "a" on /api/externeSearch', function (done) {
        chai.request(server)
            .get('/api/externeSearch')
            .set('token', 'Bearer testingToken')
            .set('search', 'a')
            .end(function (err, res) {
                should.exist(res);
                res.should.be.an('object');
                res.should.have.status(200);
                res.body.should.have.property('externes');
                expect(res.body.externes).to.have.length.within(0,5);
                done();
            });
    });
    it('should list no externe corresponding to the search "asdfsdfsdfsdf" on /api/externeSearch', function (done) {
        chai.request(server)
            .get('/api/externeSearch')
            .set('token', 'Bearer testingToken')
            .set('search', 'asdfsdfsdfsdf')
            .end(function (err, res) {
                should.exist(res);
                res.should.be.an('object');
                res.body.should.have.property('externes');
                res.body.should.have.property('externes').with.lengthOf(0)
                res.should.have.status(200);
                done();
            });
    });
    it('should send error token not valid on /api/externeSearch', function (done) {
        chai.request(server)
            .get('/api/externeSearch')
            .set('token', 'Bearer testingTokenUnvalid')
            .set('search', 'a')
            .end(function (err, res) {
                should.exist(res);
                res.should.have.status(420);
                done();
            });
    });
    it('should send error role not permitted on /api/externeSearch', function (done) {
        chai.request(server)
            .get('/api/externeSearch')
            .set('token', 'Bearer testingTokenNotPermitted')
            .set('search', 'a')
            .end(function (err, res) {
                should.exist(res);
                res.should.have.status(420);
                done();
            });
    });
    it('should list ALL 5(max) first experts corresponding to the search "a" on /api/expertSearch', function (done) {
        chai.request(server)
            .get('/api/expertSearch')
            .set('token', 'Bearer testingToken')
            .set('search', 'a')
            .end(function (err, res) {
                should.exist(res);
                res.should.be.an('object');
                res.should.have.status(200);
                res.body.should.have.property('experts');
                expect(res.body.experts).to.have.length.within(0,5);
                done();
            });
    });
    it('should list no experts corresponding to the search "asdfsdfsdfsdf" on /api/expertSearch', function (done) {
        chai.request(server)
            .get('/api/expertSearch')
            .set('token', 'Bearer testingToken')
            .set('search', 'asdfsdfsdfsdf')
            .end(function (err, res) {
                should.exist(res);
                res.should.be.an('object');
                res.body.should.have.property('experts');
                res.body.should.have.property('experts').with.lengthOf(0)
                res.should.have.status(200);
                done();
            });
    });
    it('should send error token not valid on /api/expertSearch', function (done) {
        chai.request(server)
            .get('/api/expertSearch')
            .set('token', 'Bearer testingTokenUnvalid')
            .set('search', 'a')
            .end(function (err, res) {
                should.exist(res);
                res.should.have.status(420);
                done();
            });
    });
    it('should send error role not permitted on /api/expertSearch', function (done) {
        chai.request(server)
            .get('/api/expertSearch')
            .set('token', 'Bearer testingTokenNotPermitted')
            .set('search', 'a')
            .end(function (err, res) {
                should.exist(res);
                res.should.have.status(420);
                done();
            });
    });
    it('should list ALL 5(max) first tags corresponding to the search "a" on /api/tagSearch', function (done) {
        chai.request(server)
            .get('/api/tagSearch')
            .set('token', 'Bearer testingToken')
            .set('search', 'a')
            .end(function (err, res) {
                should.exist(res);
                res.should.be.an('object');
                res.should.have.status(200);
                res.body.should.have.property('tags');
                expect(res.body.tags).to.have.length.within(0,5);
                done();
            });
    });
    it('should list no student corresponding to the search "asdfsdfsdfsdf" on /api/tagSearch', function (done) {
        chai.request(server)
            .get('/api/tagSearch')
            .set('token', 'Bearer testingToken')
            .set('search', 'asdfsdfsdfsdf')
            .end(function (err, res) {
                should.exist(res);
                res.should.be.an('object');
                res.body.should.have.property('tags');
                res.body.should.have.property('tags').with.lengthOf(0)
                res.should.have.status(200);
                done();
            });
    });
    it('should send error token not valid on /api/tagSearch', function (done) {
        chai.request(server)
            .get('/api/tagSearch')
            .set('token', 'Bearer testingTokenUnvalid')
            .set('search', 'a')
            .end(function (err, res) {
                should.exist(res);
                res.should.have.status(420);
                done();
            });
    });
    it('should send error role not permitted on /api/tagSearch', function (done) {
        chai.request(server)
            .get('/api/tagSearch')
            .set('token', 'Bearer testingTokenNotPermitted')
            .set('search', 'a')
            .end(function (err, res) {
                should.exist(res);
                res.should.have.status(420);
                done();
            });
    });
});

describe('Project POST', function () { // need test DB
    it('should add a SINGLE externe on /api/newExterne');
    it('should send an error with the missing value on /api/newExterne');
    it('should add a SINGLE project on /api/newProject');
    it('should send an error with the missing value on /api/newProject');
});
