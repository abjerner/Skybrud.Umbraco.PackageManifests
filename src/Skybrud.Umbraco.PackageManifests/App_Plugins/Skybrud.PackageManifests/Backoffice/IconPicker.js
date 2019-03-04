angular.module("umbraco").controller("PackageManifests.IconPicker.Controller", function ($scope) {
    $scope.open = function () {

        var value = $scope.model.value + " ";

        $scope.overlay = {
            view: "iconpicker",
            show: true,
            icon: value.split(" ")[0],
            color: value.split(" ")[1],
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