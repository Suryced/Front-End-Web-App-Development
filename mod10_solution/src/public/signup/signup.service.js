(function () {
"use strict";

angular.module('public')
.service('SignupService', SignupService);

SignupService.$inject = ['$http', '$q', 'ApiPath'];
function SignupService($http, $q, ApiPath) {
  var service = this;
  var user = null;

  service.saveUser = function (userInfo, favoriteItem) {
    user = angular.extend({}, userInfo, {
      favoriteItem: favoriteItem,
      favoriteCategory: getCategoryFromShortName(favoriteItem.short_name)
    });
  };

  service.getUser = function () {
    return user;
  };

  service.getFavoriteItem = function (shortName) {
    var parsed = parseShortName(shortName);

    if (!parsed) {
      return $q.when(null);
    }

    return $http.get(ApiPath + '/menu_items/' + parsed.category + '/menu_items/' + parsed.index + '.json')
    .then(function (response) {
      return response.data;
    });
  };

  service.validateFavoriteItem = function (shortName) {
    return service.getFavoriteItem(shortName).then(function (menuItem) {
      if (menuItem) {
        return menuItem;
      }

      return $q.reject('No such menu number exists');
    });
  };

  function parseShortName(shortName) {
    var normalized = (shortName || '').trim().toUpperCase();
    var match = normalized.match(/^([A-Z]+)(\d+)$/);

    if (!match) {
      return null;
    }

    if (parseInt(match[2], 10) < 1) {
      return null;
    }

    return {
      category: match[1],
      index: parseInt(match[2], 10) - 1
    };
  }

  function getCategoryFromShortName(shortName) {
    var parsed = parseShortName(shortName);
    return parsed ? parsed.category : '';
  }
}

})();
