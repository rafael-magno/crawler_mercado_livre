"use strict";

class ProductsCrawlerService {
  constructor(page) {
  	this.page = page;
  	this.products = [];
  }
  
  async findProducts(search, limit) {
  	await this.page.goto('https://www.mercadolivre.com.br/');
  	const navigationPromise = this.page.waitForNavigation();
  	await this.page.click('input[name=as_word]');
  	await this.page.keyboard.type(search);
  	await this.page.keyboard.press('Enter');
  	await navigationPromise;

		var hasPage = true;
    while (this.products.length < limit && hasPage) {
      await this.addProductsOfThePage(limit);
      var hasPage = await this.page.$('li.andes-pagination__button--next') != null;
      if (hasPage) {
        let navigationPromise = this.page.waitForNavigation();
        await this.page.click('li.andes-pagination__button--next a');
        await navigationPromise;
      }
    }

	  return this.products;
  }

  async addProductsOfThePage(limit) {
    this.products = await this.page.evaluate((products, limit) => {
      let items = document.querySelectorAll('li.results-item');
      limit = limit - products.length;
      limit = limit > items.length ? items.length : limit; 
      for (let index = 0; index < limit; index++) {
        let priceFraction = items[index].querySelector('span.price__fraction');
        let priceDecimals = items[index].querySelector('span.price__decimals');
        let store = items[index].querySelector('div.item__brand');
        let state = items[index].querySelector('div.item__condition');

        let price = parseInt(priceFraction.innerText);
        price += priceDecimals ? parseInt(priceDecimals.innerText) / 100 : 0;
        store = store ? store.innerText.replace('por ', '') : null; 
        state = state ? state.innerText.replace('Usado - ', '') : null; 

        products.push({
          name: items[index].querySelector('span.main-title').innerText,
          link: items[index].querySelector('a.item__info-title').href,
          price,
          store,
          state,
        });
      }

      return products;
    }, this.products, limit);
  }


}

module.exports = ProductsCrawlerService;