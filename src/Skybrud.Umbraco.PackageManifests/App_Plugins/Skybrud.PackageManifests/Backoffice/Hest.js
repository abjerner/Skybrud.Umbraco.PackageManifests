angular.module('umbraco').controller('Næh', function($scope) {

    if (!$scope.model.value) $scope.model.value = {};
    if (!$scope.model.value.fields) $scope.model.value.fields = [];

    angular.forEach($scope.model.value.fields, function (field) {

        field.$key = {
            alias: 'key',
            label: 'Key',
            description: 'A unique key for the prevalue field.',
            hideLabel: false,
            value: field.key,
            view: 'textbox'
        };

        field.$label = {
            alias: 'label',
            label: 'Label',
            description: 'The user friendly label for the prevalue.',
            hideLabel: false,
            value: field.label,
            view: 'textbox'
        };

        field.$description = {
            alias: 'description',
            label: 'Description',
            description: 'The user friendly label for the prevalue.',
            hideLabel: false,
            value: field.description,
            view: 'textbox'
        };

        field.$view = {
            alias: 'view',
            label: 'View',
            description: 'The type of editor to use for this prevalue field.',
            hideLabel: false,
            value: field.view,
            view: 'textbox'
        };

        field.$properties = [field.$key, field.$label, field.$description, field.$view];

        $scope.$watch(function() {
            return field.$properties;
        }, function () {
            field.key = field.$key.value;
            field.label = field.$label.value;
            field.description = field.$description.value;
            field.view = field.$view.value;
        }, true);

    });

});


angular.module('umbraco').controller('Nåh', function ($scope) {

    if (!$scope.model.value) $scope.model.value = [];

    // Add the files to a shadow array (as ng-repeat doesn't like string arrays)
    $scope.files = [];
    angular.forEach($scope.model.value, function(file) {
        $scope.files.push({file: file});
    });

    // Update the model value when the shadow array is updated
    $scope.$watch('files', function () {

        var temp = [];
        
        angular.forEach($scope.files, function (file) {
            if (file.file) temp.push(file.file);
        });

        $scope.model.value = temp;

    }, true);

});