const { insertManyPcs, getPcs } = require("../controllers/pc");

const pcRouter = require("express").Router();

pcRouter.post("/insertPcs", insertManyPcs);
pcRouter.get("/", getPcs);

module.exports = pcRouter;
