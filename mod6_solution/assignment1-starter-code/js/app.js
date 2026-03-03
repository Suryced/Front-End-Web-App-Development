(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.inject = ['$scope'];

function LunchCheckController ($scope) {
    $scope.lunchMenu = "";
    $scope.checkLunch = function () {
        if ($scope.lunchMenu.trim() === "") {
            $scope.message = "Please enter data first";
            $scope.messageColor = 'red';
        } else {
            var dishes = $scope.lunchMenu.split(',').filter(function (dish) {
                return dish.trim() !== "";
            });
            if (dishes.length <= 3) {
                $scope.message = "Enjoy!";
            } else {
                $scope.message = "Too much!";
            }
            $scope.messageColor = 'green';
        }
    };
  
}

})();
