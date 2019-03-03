angular.module("umbraco").controller("PackageManifests.Config.DocTypeGridEditorAllowedTypes.Controller", function ($scope) {

    if (!$scope.model.value) $scope.model.value = [];

    // Add the types to a shadow array (as ng-repeat doesn't like string arrays)
    $scope.types = [];
    angular.forEach($scope.model.value, function (pattern) {
        $scope.types.push({ pattern: pattern});
    });

    // Update the model value when the shadow array is updated
    $scope.$watch("types", function () {

        var temp = [];
        
        angular.forEach($scope.types, function (type) {
            if (type.pattern) temp.push(type.pattern);
        });

        $scope.model.value = temp;

    }, true);

});