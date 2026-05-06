(function () {
"use strict";

angular.module('public')
.directive('favoriteItem', FavoriteItemDirective);

FavoriteItemDirective.$inject = ['$q', 'SignupService'];
function FavoriteItemDirective($q, SignupService) {
  return {
    require: 'ngModel',
    link: function (scope, element, attrs, ngModel) {
      ngModel.$asyncValidators.favoriteItem = function (modelValue, viewValue) {
        var value = modelValue || viewValue;

        if (ngModel.$isEmpty(value)) {
          return $q.when();
        }

        return SignupService.validateFavoriteItem(value);
      };
    }
  };
}

})();
