angular.module("umbraco").controller("PackageManifests.Properties.Controller", function ($scope, formHelper) {

    $scope.properties = angular.copy($scope.model.properties);

    $scope.save = function () {

        if (formHelper.submitForm({ scope: $scope })) {

            formHelper.resetForm({ scope: $scope });

            $scope.model.submit($scope.properties);

        }

    };

});