const Pc = require("../models/pc");
const pcs = require("../../../pcs.json");

const insertManyPcs = async (req, res, next) => {
	try {
		await Pc.insertMany(pcs.results);
		return res.status(201).json("Todos los datos subidos a la BBDD");
	} catch (error) {
		console.log(error);
		return res.status(400).json(error);
	}
};

const getPcs = async (req, res, next) => {
	try {
		const allPc = await Pc.find();
		return res.status(200).json(allPc);
	} catch (error) {
		return res.status(400).json(error);
	}
};

module.exports = { insertManyPcs, getPcs };
