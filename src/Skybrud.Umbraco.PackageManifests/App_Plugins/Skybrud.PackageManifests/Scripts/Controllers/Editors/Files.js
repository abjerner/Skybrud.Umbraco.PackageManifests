angular.module("umbraco").controller("PackageManifests.Files.Controller", function ($scope) {

    if (!$scope.model.value) $scope.model.value = [];

    // Add the files to a shadow array (as ng-repeat doesn't like string arrays)
    $scope.files = [];
    angular.forEach($scope.model.value, function (file) {
        $scope.files.push({ file: file });
    });

    // Update the model value when the shadow array is updated
    $scope.$watch("files", function () {

        var temp = [];

        angular.forEach($scope.files, function (file) {
            if (file.file) temp.push(file.file);
        });

        $scope.model.value = temp;

    }, true);

});