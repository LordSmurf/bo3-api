const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { fetchMaps } = require("./scraper");

const app = express();
app.use(morgan("dev"));
app.use(cors());

let port = process.env.port || 3000;

app.get("/", async (req, res) => {
	const maps = await fetchMaps(1);
	res.json(maps);
});

app.listen(port, () => {
	console.log(`Listening on http://localhost:${port}`);
});
