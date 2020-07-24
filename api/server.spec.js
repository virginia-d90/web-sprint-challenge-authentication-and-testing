const server = require('./server')
const db = require('../database/dbConfig')
const supertest = require('supertest')


//setup check
describe("server", function () {
   

    it("runs the tests", function () {
        expect(true).toBe(true);
    })
})

describe('endpoint testing', function(){
    beforeAll(async () => {
        await db('users').truncate()
    })
    
    describe('POST /register', function(){
        //test 1
        it('should return status 201', function(){
            return supertest(server)
                .post('/api/auth/register')
                .send({username: "Virginia", password: "abcde"})
                .then( res => expect(res.status).toBe(201))
        })

        //test 2
        it('should match res.type to json', function(){
            return supertest(server)
                .post('/api/auth/register')
                .send({username: "Virginia", password: "abcde"})
                .then( res => expect(res.type).toMatch(/json/i))
                
        })
    })

    describe('POST /login', function(){

        //test1
        it('should return status 200', function(){
            return supertest(server)
                .post('/api/auth/login')
                .send({username: "Virginia", password: "abcde"})
                .then( res => expect(res.status).toBe(200))
        })

        //test2
        it('should match res.type to json', function(){
            return supertest(server)
                .post('/api/auth/login')
                .send({username: "Virginia", password: "abcde"})
                .then( res => expect(res.type).toMatch(/json/i))
        })

        //test 3
        it('should return status 400 with incorrect password', function(){
            return supertest(server)
                .post('/api/auth/login')
                .send({username: "Virginia", password:"12345"})
                .then( res => expect(res.status).toBe(400))
        })
    })

    describe('GET /jokes', function(){

        //test 1
        it('should be defined', function(){
            return supertest(server)
                .get('/api/jokes')
                .then(res => {
                    expect(res.body).toBeDefined
                })
        })

        //test 2
        it('should match res.type to json', function(){
            return supertest(server)
                .get('/api/jokes')
                .then(res => {
                    expect(res.type).toMatch(/json/i)
                })
        })

    })

})

