var request = require("supertest");
var expect = require("chai").expect;
var app = require('../app.js');
var app2 = require('../../backendCrearProducto/app.js')

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


//test product

describe('test product API',function(){
    before(()=>{
        app2.connect;
    })

    it('TEST API /productos/',()=>{
        app2.connect;
        request(app2).post('/productos/')
        .send({
            "sku": 2525,
            "nombre":"ejemplo 1",
            "precio":25,
            "descripcion":"prueba",
            "imagen": "",
            "urlImagen": "",
            "Editorial": "Piedra Santa",
            "Genero": ["Ejemplo 3","Ejemplo 2"]
        })
        .then((res)=>{
            const body = res.body;
            expect(body).to.contain.property('mensaje');
        })
    });

    it('TEST API /productos/',()=>{
        app2.connect;
        request(app2).post('/productos/')
        .send({
            "sku": 2526,
            "nombre":"ejemplo 2",
            "precio":250,
            "descripcion":"prueba",
            "imagen": "",
            "urlImagen": "",
            "Editorial": "Piedra Santa",
            "Genero": ["Ejemplo 3","Ejemplo 2"]
        })
        .then((res)=>{
            const body = res.body;
            expect(body).to.contain.property('mensaje');
        })
    });
    after(()=>{
    })
});