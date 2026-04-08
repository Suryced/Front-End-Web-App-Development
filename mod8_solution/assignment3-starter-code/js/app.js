(function () {
  'use strict';

  angular
    .module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .directive('foundItems', FoundItemsDirective);

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var menu = this;

    menu.searchTerm = '';
    menu.found = [];
    menu.searched = false;

    menu.narrowMenu = function () {
      MenuSearchService.getMatchedMenuItems(menu.searchTerm)
        .then(function (foundItems) {
          menu.found = foundItems;
          menu.searched = true;
        })
        .catch(function () {
          menu.found = [];
          menu.searched = true;
        });
    };

    menu.removeItem = function (itemIndex) {
      menu.found.splice(itemIndex, 1);
    };
  }

  MenuSearchService.$inject = ['$http', '$q'];
  function MenuSearchService($http, $q) {
    var service = this;

    service.getMatchedMenuItems = function (searchTerm) {
      if (!searchTerm || !searchTerm.trim()) {
        return $q.when([]);
      }

      return $http({
        method: 'GET',
        url: 'https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json'
      }).then(function (result) {
        var foundItems = [];
        var loweredSearchTerm = searchTerm.trim().toLowerCase();
        var allCategories = result.data;

        angular.forEach(allCategories, function (categoryData) {
          angular.forEach(categoryData.menu_items, function (item) {
            var description = item.description || '';

            if (description.toLowerCase().indexOf(loweredSearchTerm) !== -1) {
              foundItems.push(item);
            }
          });
        });

        return foundItems;
      });
    };
  }

  function FoundItemsDirective() {
    var ddo = {
      restrict: 'E',
      template:
        '<div>' +
          '<ul class="list-group" ng-if="items.length">' +
            '<li class="list-group-item" ng-repeat="item in items track by $index">' +
              '<strong>{{ item.name }}</strong>, ' +
              '{{ item.short_name }}, ' +
              '{{ item.description }}' +
              '<button class="btn btn-danger btn-xs pull-right" ng-click="onRemove({ index: $index })">' +
                'Don\'t want this one!' +
              '</button>' +
            '</li>' +
          '</ul>' +
          '<p class="text-danger" ng-if="searched && !items.length">Nothing found</p>' +
        '</div>',
      scope: {
        items: '<',
        onRemove: '&',
        searched: '<'
      }
    };

    return ddo;
  }
})();
