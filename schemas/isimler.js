const { Schema, model } = require("mongoose");
//CODER BY KRON1K.
const schema = Schema({
	guildID: { type: String, default: "" },
	userID: { type: String, default: "" },
	isimler: { type: Array, default: [] },
	yetkili: {type: String, default: ""}
});
//CODER BY KRON1K.
module.exports = model("isimler", schema);