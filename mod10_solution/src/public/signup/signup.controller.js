(function () {
"use strict";

angular.module('public')
.controller('SignupController', SignupController);

SignupController.$inject = ['SignupService'];
function SignupController(SignupService) {
  var $ctrl = this;

  $ctrl.user = {};
  $ctrl.completed = false;

  $ctrl.submit = function () {
    $ctrl.completed = false;

    return SignupService.getFavoriteItem($ctrl.user.favorite).then(function (favoriteItem) {
      if (!favoriteItem) {
        return;
      }

      SignupService.saveUser({
        firstName: $ctrl.user.firstName,
        lastName: $ctrl.user.lastName,
        email: $ctrl.user.email,
        phone: $ctrl.user.phone,
        favorite: $ctrl.user.favorite.toUpperCase()
      }, favoriteItem);

      $ctrl.completed = true;
    });
  };
}

})();
