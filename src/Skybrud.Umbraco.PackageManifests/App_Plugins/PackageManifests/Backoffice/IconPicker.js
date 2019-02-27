angular.module("umbraco").controller("PackageManifests.IconPicker.Controller", function ($scope) {
    $scope.open = function() {
        $scope.overlay = {
            view: "iconpicker",
            show: true,
            icon: $scope.model.value,
            submitButtonLabel: "Continue",
            submit: function (model) {
                var icon = [model.icon];
                if (model.color) icon.push(model.color);
                $scope.model.value = icon.join(" ");
                $scope.overlay.show = false;
                $scope.overlay = null;
            }
        };
    };
});