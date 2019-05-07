const {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists
} = require("sequelize-test-helpers");
const GameModel = require("../../models/game");

describe("game model", () => {
  const Model = GameModel(sequelize, dataTypes);
  const instance = new Model();

  checkModelName(Model)("Game");

  ("properties", () => {
    ["title", "price", "releaseYear", "active"].forEach(checkPropertyExists(instance));
  });
});