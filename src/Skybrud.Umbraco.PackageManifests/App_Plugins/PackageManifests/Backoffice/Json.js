angular.module("umbraco").controller("PackageManifests.Json.Controller", function ($scope) {

    $scope.json = $scope.model.value && $scope.model.value ? JSON.stringify($scope.model.value, null, "  ") : "";

    $scope.$watch(function () {
        return $scope.json;
    }, function (value) {

        if (value) {

            // https://stackoverflow.com/a/39050609

            var json = value

                    // Replace ":" with "@colon@" if it's between double-quotes
                    .replace(/:\s*"([^"]*)"/g, function (match, p1) {
                        return ': "' + p1.replace(/:/g, '@colon@') + '"';
                    })

                    // Replace ":" with "@colon@" if it's between single-quotes
                    .replace(/:\s*'([^']*)'/g, function (match, p1) {
                        return ': "' + p1.replace(/:/g, '@colon@') + '"';
                    })

                    // Add double-quotes around any tokens before the remaining ":"
                    .replace(/(['"])?([a-z0-9A-Z_]+)(['"])?\s*:/g, '"$2": ')

                    // Turn "@colon@" back into ":"
                    .replace(/@colon@/g, ':')
                ;

            try {
                $scope.model.value = JSON.parse(json);
                $scope.error = null;
            } catch (ex) {
                $scope.model.value = null;
                $scope.error = ex.message;
            }
        } else {
            $scope.model.value = null;
            $scope.error = null;
        }

    }, true);

});