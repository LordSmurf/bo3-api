const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
const { fetchMaps } = require("./scraper");

const app = express();
app.use(morgan("dev"));
app.use(cors());

let port = process.env.PORT || 3000;
let allMaps = [];

app.get("/", async (req, res) => {
	//res.json({ message: "Hello world!" });
	for (let index = 0; index < 10; index++) {
		maps = await fetchMaps(index);
		allMaps.push(maps);
	}
	await res.json(allMaps);
});

app.listen(process.env.PORT, () => {
	console.log(`Listening on http://localhost:${process.env.PORT}`);
});
