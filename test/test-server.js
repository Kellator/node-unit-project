//require the two chai modules & server.js file
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server.js');
//variable to call the chai.should function
var should = chai.should();
//aliases for app and storage objects from server.js
var app = server.app;
var storage = server.storage;
//tells Chai to use the chaiHTTP plugin
chai.use(chaiHttp);
//begins tests
describe('Shopping List', function() {
    it('should list items on get', function(done) {
        chai.request(app)
        .get('/items')
        .end(function(err, res) {
            should.equal(err, null);
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('array');
            res.body.should.have.length(3);
            res.body[0].should.be.a('object');
            res.body[0].should.have.property('id');
            res.body[0].should.have.property('name');
            res.body[0].id.should.be.a('number');
            res.body[0].name.should.be.a('string');
            res.body[0].name.should.be.equal('Broad beans');
            res.body[1].name.should.equal('Tomatoes');
            res.body[2].name.should.equal('Peppers');
            done();
        });
    });
    
    it('should add an item on post', function(done) {
        chai.request(app)
            .post('/items')
            .send({'name': 'Kale'})
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('name');
                res.body.should.have.property('id');
                res.body.name.should.be.a('string');
                res.body.id.should.be.a('number');
                res.body.name.should.equal('Kale');
                storage.items.should.be.a('array');
                storage.items.should.have.length(4);
                storage.items[3].should.be.a('object');
                storage.items[3].should.have.property('id');
                storage.items[3].should.have.property('name');
                storage.items[3].id.should.be.a('number');
                storage.items[3].name.should.be.a('string');
                storage.items[3].name.should.equal('Kale');
                done();
            });
    });
    it('should edit an item on put', function(done) {
        chai.request(app)
            .put('/items/1')
            .send({'name': 'Broad beans', 'id': 1})
            .end(function(err, res) {
                //console.log(err);
                should.equal(err, null);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('name');
                res.body.should.have.property('id');
                res.body.name.should.be.a('string');
                storage.items.should.be.a('array');
                storage.items[0].should.be.a('object');
                storage.items[0].should.have.property('id');
                storage.items[0].should.have.property('name');
                storage.items[0].id.should.be.a('number');
                storage.items[0].name.should.be.a('string');
                storage.items[0].name.should.equal('Broad beans');
                storage.items[0].id.should.equal(1);
                done();
            });
       
    });
    it('should delete an item on delete', function(done) {
        chai.request(app)
            .delete('/items/1')
            .send()
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(200);
                storage.items.should.have.length(3);
                storage.items.should.be.a('array');
                res.body.should.be.a('object');
                res.should.be.json;
                done();
            });
    });
    it('should throw error when ID already exists on post');
    it('should throw error if there is no body data on post');
    it('should throw error if something other than JSON is used on post');
    it('should throw error if no endpoint on put');
    it('should throw error if the body and endpoint ID do not match on put');
    it('should throw error if there is a change to an ID that does not exist on put');
    it('should throw error if this there is no body data on put');
    it('should throw error if something other than JSON is used on put');
    it('should throw error if ID does not exist on delete');
    it('should throw error if endpoint has no id on delete');
});