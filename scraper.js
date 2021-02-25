const axios = require("axios");
const cheerio = require("cheerio");

async function fetchMaps(page) {
	switch (page) {
		case 1:
			page = 1;
			break;
		case 2:
			page = 2;
			break;
		case 3:
			page = 3;
			break;
		case 4:
			page = 4;
			break;
		case 5:
			page = 5;
			break;
		case 6:
			page = 6;
			break;
		case 7:
			page = 7;
			break;
		case 8:
			page = 8;
			break;
		case 9:
			page = 9;
			break;
		case 10:
			page = 10;
			break;

		default:
			page = 1;
			break;
	}

	const url = `https://steamcommunity.com/workshop/browse/?appid=311210&browsesort=mostrecent&section=readytouseitems&actualsort=mostrecent&p=${page}`;
	const { data } = await axios.get(url);
	const $ = cheerio.load(data);
	const maps = [];
	$(".workshopItem").each((index, element) => {
		const $element = $(element);
		const title = $element.find(".workshopItemTitle.ellipsis").text();
		const dirtyAuthor = $element
			.find(".workshopItemAuthorName.ellipsis")
			.text();
		let author = dirtyAuthor.substring(3);
		const thumbnail = $element.find(".workshopItemPreviewImage").attr("src");
		const ratingUrl = $element.find(".fileRating").attr("src");
		let rating;

		switch (ratingUrl) {
			case "https://community.cloudflare.steamstatic.com/public/images/sharedfiles/not-yet.png?v=2":
				rating = "Not rated";
				break;
			case "https://community.cloudflare.steamstatic.com/public/images/sharedfiles/1-star.png?v=2":
				rating = "One Star";
				break;
			case "https://community.cloudflare.steamstatic.com/public/images/sharedfiles/2-star.png?v=2":
				rating = "Two Star";
				break;
			case "https://community.cloudflare.steamstatic.com/public/images/sharedfiles/3-star.png?v=2":
				rating = "Three Star";
				break;
			case "https://community.cloudflare.steamstatic.com/public/images/sharedfiles/4-star.png?v=2":
				rating = "Four Star";
				break;
			case "https://community.cloudflare.steamstatic.com/public/images/sharedfiles/5-star.png?v=2":
				rating = "Five Star";
				break;
			case "https://community.akami.steamstatic.com/public/images/sharedfiles/not-yet.png?v=2":
				rating = "Not rated";
				break;
			case "https://community.akami.steamstatic.com/public/images/sharedfiles/1-star.png?v=2":
				rating = "One Star";
				break;
			case "https://community.akami.steamstatic.com/public/images/sharedfiles/2-star.png?v=2":
				rating = "Two Star";
				break;
			case "https://community.akami.steamstatic.com/public/images/sharedfiles/3-star.png?v=2":
				rating = "Three Star";
				break;
			case "https://community.akami.steamstatic.com/public/images/sharedfiles/4-star.png?v=2":
				rating = "Four Star";
				break;
			case "https://community.akami.steamstatic.com/public/images/sharedfiles/5-star.png?v=2":
				rating = "Five Star";
				break;

			default:
				rating = "Not Rated";
				break;
		}

		const map = {
			title,
			author,
			thumbnail,
			rating,
		};
		maps.push(map);
	});
	return maps;
}

module.exports = { fetchMaps };
