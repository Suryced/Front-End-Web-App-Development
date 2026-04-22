(function () {
  "use strict";

  angular
    .module("MenuApp")
    .component("categories", {
      bindings: {
        categories: "<"
      },
      templateUrl: "src/templates/categories.template.html"
    });
})();
