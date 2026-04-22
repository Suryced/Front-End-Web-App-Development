(function () {
  "use strict";

  angular
    .module("MenuApp")
    .component("items", {
      bindings: {
        itemsData: "<"
      },
      templateUrl: "src/templates/items.template.html"
    });
})();
