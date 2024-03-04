const puppeteer = require("puppeteer");
const fs = require("fs");

const pcArray = [];

const scrapper = async (url) => {
	console.log(url);

	const browser = await puppeteer.launch({ headless: false });

	const page = await browser.newPage();
	await page.setUserAgent(
		"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36"
	);

	await page.goto(url);

	await page.setViewport({ width: 1080, height: 1024 });

	const arrayDivs = await page.$$(".product-card");

	for (const pcDiv of arrayDivs) {
		let img = await pcDiv.$eval("img", (el) => el.src);
		let title = await pcDiv.$eval(
			".product-card__title",
			(el) => el.textContent
		);
		title = title.replace('"', "");

		let reviews;
		let price;

		try {
			price = await pcDiv.$eval(".product-card__price-container", (el) =>
				parseFloat(el.textContent.slice(0, el.textContent.length - 1))
			);
		} catch (error) {
			price = 0;
		}

		try {
			reviews = await pcDiv.$eval(".ejBzcU", (el) => {
				const text = el.textContent.trim();
				return parseInt(text.replace(/[^\d]/g, ""));
			});
		} catch (error) {
			reviews = 0;
		}

		const pc = {
			img,
			title,
			reviews,
			price,
		};

		pcArray.push(pc);
	}

	await page.$eval(".hNByJu", (el) => el.click());
	console.log("siguiente pagina");
	await page.waitForNavigation();
	// write(pcArray);
};

const write = (pcArray) => {
	fs.writeFile("pcs.json", JSON.stringify(pcArray, null, 2), () => {
		console.log("Archivo escrito ✅");
	});
};

module.exports = { scrapper };
