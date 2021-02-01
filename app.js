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

let cachedData;
let cacheTime;

app.get("/", async (req, res) => {
	//res.json({ message: "Hello world!" });
	if(cacheTime && cacheTime > Date.now() - 864 * 100000) {
		return res.json(cachedData);
	} else {
		for (let index = 0; index < 5; index++) {
			maps = await fetchMaps(index);
			allMaps.push(maps);
			cachedData = allMaps;
			cacheTime = Date.now();
		};
		return res.json(cachedData);
	};

});

app.listen(process.env.PORT, () => {
	console.log(`Listening on http://localhost:${process.env.PORT}`);
});
