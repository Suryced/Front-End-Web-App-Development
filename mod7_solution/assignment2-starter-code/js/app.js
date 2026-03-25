(function () {
  'use strict';

  angular
    .module('ShoppingListCheckOff', [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService)

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
    var toBuy = this;

    toBuy.items = ShoppingListCheckOffService.getToBuyItems();
    toBuy.buyItem = function (itemIndex) {
      ShoppingListCheckOffService.buyItem(itemIndex);
    };
  }

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var bought = this;

    bought.items = ShoppingListCheckOffService.getBoughtItems();
    bought.getTotalPrice = function (item) {
      return item.quantity * item.pricePerItem;
    };
  }

  function ShoppingListCheckOffService() {
    var service = this;

    var toBuyItems = [
      { name: 'cookies', quantity: 10, pricePerItem: 2 },
      { name: 'apples', quantity: 6, pricePerItem: 1.5 },
      { name: 'milk cartons', quantity: 2, pricePerItem: 3.25 },
      { name: 'bread loaves', quantity: 3, pricePerItem: 2.75 },
      { name: 'coffee bags', quantity: 1, pricePerItem: 12.5 }
    ];
    var boughtItems = [];

    service.getToBuyItems = function () {
      return toBuyItems;
    };

    service.getBoughtItems = function () {
      return boughtItems;
    };

    service.buyItem = function (itemIndex) {
      var item = toBuyItems.splice(itemIndex, 1)[0];
      boughtItems.push(item);
    };
  }

})();
