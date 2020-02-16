'use strict';

class ListProductsResponder {
  constructor(response) {
    this.response = response;
  }

  respondSuccess(products) {
    this.response.successCode = 200;
    this.response.end(JSON.stringify(products));
  }
  
  respondError(error) {
    let dataResponse = {exception: error}
    this.response.successCode = 500;
    this.response.end(JSON.stringify(dataResponse));
  }
}

module.exports = ListProductsResponder;