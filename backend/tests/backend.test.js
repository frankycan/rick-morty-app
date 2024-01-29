// var request=require('supertest');
// var app = require('../src/app.js')
import request from 'supertest'
import app from '../src/app.js'
var cookie;


//Register user test 
describe("POST /api/auth/register", () => {
    test("should create a user", async () => {
        return request(app)
            .post("/api/auth/register")
            .send({ email: 'tes@test.com', password: 'My1SeCuRePa$$W0rD!', confirmPassword: 'My1SeCuRePa$$W0rD!' })
            .expect(201)
    });
});


//Login user test 
describe("POST /api/auth/login", () => {
    test("should login a user", async () => {
        return request(app)
            .post("/api/auth/login")
            .send({ email: 'tes@test.com', password: 'My1SeCuRePa$$W0rD!' })
            .expect(200)
            .then(({ headers })=>{
                cookie = headers['set-cookie'];
            })
    });
});

//Get user data
describe("GET /api/auth/users", () => {
    test("should get the user profile", async () => {
        return request(app)
            .get("/api/auth/users")
            .set("Cookie", [cookie])
            .expect(200)
    });
});

//Update user data
describe("PUT /api/auth/users/", () => {
    test("should update the user profile", async () => {
        return request(app)
            .put("/api/auth/users")
            .set("Cookie", [cookie])
            .send({ favoriteCharacters: [33] })
            .expect(200)
    });
});

//Confirm updated user data
describe("GET /api/auth/users", () => {
    test("should get the updated user profile", async () => {
        return request(app)
            .get("/api/auth/users")
            .set("Cookie", [cookie])
            .expect(200)
    });
});

//Get characters list
describe("GET /api/characters/characters", () => {
    test("should get the characters list", async () => {
        return request(app)
            .get("/api/characters/")
            .set("Cookie", [cookie])
            .expect(200)
    });
});

//Logout user test 
describe("POST /api/auth/logout", () => {
    test("should logout a user", async () => {
        return request(app)
            .post("/api/auth/logout")
            .set('cookie', cookie)
            .send({})
            .expect(200)
            .then(({ headers })=>{
                cookie = headers['set-cookie'];
            })
    });
});

//Fail to get the characters list if not logged-in
describe("GET /api/characters/characters", () => {
    test("should NOT get the characters list", async () => {
        return request(app)
            .get("/api/characters/")
            .set("Cookie", [cookie])
            .expect(401)
    });
});