(function () {
  "use strict";

  angular
    .module("MenuApp")
    .config(RoutesConfig);

  RoutesConfig.$inject = ["$stateProvider", "$urlRouterProvider"];
  function RoutesConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");

    $stateProvider
      .state("home", {
        url: "/",
        templateUrl: "src/templates/home.template.html"
      })
      .state("categories", {
        url: "/categories",
        template: "<categories categories=\"categoriesCtrl.categories\"></categories>",
        controller: "CategoriesController as categoriesCtrl",
        resolve: {
          categories: ["MenuDataService", function (MenuDataService) {
            return MenuDataService.getAllCategories().then(function (response) {
              return response.data;
            });
          }]
        }
      })
      .state("items", {
        url: "/items/{categoryShortName}",
        template: "<items items-data=\"itemsCtrl.items\"></items>",
        controller: "ItemsController as itemsCtrl",
        resolve: {
          items: ["$stateParams", "MenuDataService", function ($stateParams, MenuDataService) {
            return MenuDataService
              .getItemsForCategory($stateParams.categoryShortName)
              .then(function (response) {
                return response.data;
              });
          }]
        }
      });
  }
})();
