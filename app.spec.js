var shell = require('shelljs');
var request = require("supertest");
var app = require('./app');

describe('api', () => {
  beforeEach(() => {
      shell.exec('npx sequelize db:migrate:undo:all')
      shell.exec('npx sequelize db:create')
      shell.exec('npx sequelize db:migrate')
      shell.exec('npx sequelize db:seed:all')
    })

  describe('Test the root path', () => {
    test('should return a 200', () => {
      return request(app).get("/").then(response => {
        expect(response.statusCode).toBe(200)
      })
    });
  });

  describe('Test get /api/v1/games path', () => {
    test('should return a 200', () => {
      return request(app).get("/api/v1/games").then(response => {
        expect(response.status).toBe(200)
      });
    });
    test('should return an array of games ', () => {
      return request(app).get("/api/v1/games").then(response => {
        expect(response.body.length).toEqual(4),
        expect(Object.keys(response.body[0])).toContain('title')
        expect(Object.keys(response.body[0])).toContain('price'),
        expect(Object.keys(response.body[0])).toContain('releaseYear'),
        expect(Object.keys(response.body[0])).toContain('active')
      })
    });
  });

  describe('Test get /api/v1/games/:id path', () => {
    test('should return a 200', () => {
      return request(app).get("/api/v1/games/1").then(response => {
        expect(response.status).toBe(200)
      });
    });
    test('should return a single game ', () => {
      return request(app).get("/api/v1/games/1").then(response => {
        expect(response.body.length).toEqual(1),
        expect(Object.keys(response.body[0])).toContain('title')
        expect(Object.keys(response.body[0])).toContain('price'),
        expect(Object.keys(response.body[0])).toContain('releaseYear'),
        expect(Object.keys(response.body[0])).toContain('active')
      })
    });
  });

  describe('Test delete /api/v1/games/:id path', () => {
    test('should return a 200', () => {
      return request(app).delete("/api/v1/games/4").then(response => {
        expect(response.status).toBe(204)
      });
    });
  });
});