var request = require("supertest");
var expect = require("chai").expect;
var app = require('../app.js');


describe('test Users API',function(){
    before(()=>{
        app.connect;
    })
    it('TEST API /users/getallnoacepted',()=>{
        app.connect;
        request(app).get('/users/getallnoacepted')
        .then((res)=>{
            const body = res.body;
            expect(body.length).to.equal(0);
        }).catch((err)=>{console.log(err)});
    });
    it('TEST API /users/login',()=>{
        app.connect;
        request(app).post('/users/login')
        .send({"username":"admin","contraseña":"admin!123"})
        .then((res)=>{
            const body = res.body;
            expect(body).to.contain.property('_id');
        })
    });
    after(()=>{
    })
});