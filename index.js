'use strict';

const bodyParser         = require('body-parser');
const router             = require('restana')();
const ListProductsAction = require('./src/Action/ListProductsAction');
const puppeteer          = require('puppeteer');

(async () => {
	const browser = await puppeteer.launch();
	module.exports.page = await browser.newPage();

	router.use(bodyParser.json());
	 
	router.post('/products', ListProductsAction.make);

	router.start(3000);
})();