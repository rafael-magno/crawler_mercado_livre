'use strict';

const ListProductsResponder = require('../Responder/ListProductsResponder');
const ProductsCrawlerService   = require('../Domain/Service/ProductsCrawlerService');

class ListProductsAction {
  static make(request, response) {
    let self = new ListProductsAction(request.body, response);
    self.invoke();
  }
  
  constructor(requestBody, response) {
    this.data = requestBody;
    this.listProductsResponder = new ListProductsResponder(response);
    this.productsCrawlerService = new ProductsCrawlerService(module.parent.exports.page);
  }

  async invoke() {
    try {
      let products = await this.productsCrawlerService.findProducts(
        this.data.search, 
        this.data.limit
      );
      this.listProductsResponder.respondSuccess(products);
    } catch (error) {
      this.listProductsResponder.respondError(error);
    }
  }
}

module.exports = ListProductsAction;
