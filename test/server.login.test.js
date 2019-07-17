var chai = require('chai');
var chaiHttp = require('chai-http'); // not installed, only if needed
chai.use(chaiHttp);
var server = require('../server/index');
var should = chai.should();
var expect = chai.expect;

describe('Login POST', function () {
    it('should send back valid token with role "Professeur" on /api/login', function (done) {
        chai.request(server)
            .post('/api/login')
            .send({email: "Jacques.Supcik@hefr.ch", password: "test"})
            .end(function (err, res) {
                should.exist(res);
                res.should.have.status(200);
                res.body.should.have.property('token');
                res.body.should.have.property('role');
                expect(res.body.role).to.equal('Professeur');
                res.body.should.have.property('id');
                res.body.should.have.property('name');
                done();
            });
    });
    it('should send back valid token with role "Etudiant" on /api/login', function (done) {
        chai.request(server)
            .post('/api/login')
            .send({email: "yann.doudin@edu.hefr.ch", password: "test"})
            .end(function (err, res) {
                should.exist(res);
                res.should.have.status(200);
                res.body.should.have.property('token');
                res.body.should.have.property('role');
                expect(res.body.role).to.equal('Etudiant');
                res.body.should.have.property('id');
                res.body.should.have.property('name');
                done();
            });
    });
    it('should send back valid token with role "Responsable" on /api/login', function (done) {
        chai.request(server)
            .post('/api/login')
            .send({email: "Philippe.Joye@hefr.ch", password: "test"})
            .end(function (err, res) {
                should.exist(res);
                res.should.have.status(200);
                res.body.should.have.property('token');
                res.body.should.have.property('role');
                expect(res.body.role).to.equal('Responsable');
                res.body.should.have.property('id');
                res.body.should.have.property('name');
                done();
            });
    });
    it('should send an error (email not valid) /api/login', function (done) {
        chai.request(server)
            .post('/api/login')
            .send({email: "Inconnu@hefr.ch", password: "test"})
            .end(function (err, res) {
                should.exist(res);
                res.should.have.status(410);
                done();
            });
    });
    it('should send an error (password not valid) /api/login', function (done) {
        chai.request(server)
            .post('/api/login')
            .send({email: "Jacques.Supcik@hefr.ch", password: "test2"})
            .end(function (err, res) {
                should.exist(res);
                res.should.have.status(410);
                done();
            });
    });
    it('should send an error (no body) /api/login', function (done) {
        chai.request(server)
            .post('/api/login')
            .end(function (err, res) {
                should.exist(res);
                res.should.have.status(410);
                done();
            });
    });
});