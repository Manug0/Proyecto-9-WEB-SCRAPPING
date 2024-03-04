const mongoose = require("mongoose");

const pcSchema = new mongoose.Schema(
	{
		img: { type: String, required: true },
		title: { type: String, required: true },
		reviews: { type: String, required: true },
		price: { type: Number, required: true },
	},
	{
		timestamps: true,
		collection: "PCs",
	}
);

const Pc = mongoose.model("PCs", pcSchema, "PCs");

module.exports = Pc;
