angular.module("umbraco").controller("PackageManifests.Array.Controller", function ($scope) {

    if (!$scope.model.value) $scope.model.value = [];

    // Add the items to a shadow array (as ng-repeat doesn't like string arrays)
    $scope.items = [];
    angular.forEach($scope.model.value, function (item) {
        $scope.items.push({ value: item });
    });

    // Update the model value when the shadow array is updated
    $scope.$watch("items", function () {

        var temp = [];

        angular.forEach($scope.items, function (item) {
            if (item.value) temp.push(item.value);
        });

        $scope.model.value = temp;

    }, true);

});