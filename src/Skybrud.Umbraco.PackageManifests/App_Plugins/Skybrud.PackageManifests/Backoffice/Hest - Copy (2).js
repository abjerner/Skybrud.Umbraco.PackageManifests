angular.module('umbraco').controller('PackageManifests.EditManifest.Controller', function ($scope, $routeParams, $http, notificationsService, navigationService) {
    
    $scope.route = $routeParams;

    $scope.loading = true;

    var id = $routeParams.id.split(',');

    $scope.name = '';
    $scope.alias = id[0];
    $scope.packageAlias = id[0];
    $scope.path = ['-1'];

    var baseUrl = '/umbraco/backoffice/Skybrud.PackageManifests/Manifests/';

    $scope.saveManifest = function () {

        // TODO: Validate the property editor (eg. check required properties)

        // As "PostManifest" will only save the files, but not editor information, we might as well just trim down the JSON sent to the server
        var data = {
            javascript: $scope.manifest.manifest.javascript,
            css: $scope.manifest.manifest.css
        };

        $http.post(baseUrl + 'PostManifest?packageAlias=' + $scope.alias + '&editorAlias=' + id[2], data).success(function () {
            notificationsService.success('Manifest saved', 'The package.manifest file for <strong>' + $scope.manifest.name + '</strong> was successfully saved.');
        });

    };

    $scope.savePropertyEditor = function () {

        // TODO: Validate the property editor (eg. check required properties)

        $http.post(baseUrl + 'PostPropertyEditor?packageAlias=' + $scope.alias + '&editorAlias=' + id[2], $scope.propertyEditor).success(function () {
            notificationsService.success('Property editor saved', 'The property editor <strong>' + $scope.propertyEditor.name + '</strong> was successfully saved.');
            console.log('force reload');
            console.log($scope.path);
            navigationService.syncTree({ tree: 'packageManifests', path: $scope.path, forceReload: true });
        });

    };

    if (id.length === 1) {

        $http.get("/umbraco/backoffice/Skybrud.PackageManifests/Manifests/GetManifestByAlias?alias=" + $routeParams.id).success(function (r) {
            $scope.manifest = r;
            $scope.name = r.name;

            console.log(r.manifest);
            return;

            $scope.properties = [
                {
                    alias: 'javascript',
                    label: 'JavaScript',
                    description: 'A list of JavaScript files with full path to load for your property editor.',
                    hideLabel: false,
                    value: r.manifest.javascript && Array.isArray(r.manifest.javascript) ? r.manifest.javascript : [],
                    view: '/App_Plugins/Skybrud.PackageManifests/Views/manifest.files.html',
                    updated: function (p) { $scope.manifest.manifest.javascript = p.value; }
                },
                {
                    alias: 'css',
                    label: 'CSS',
                    description: 'A list of CSS files with full path to load for your property editor.',
                    hideLabel: false,
                    value: r.manifest.css && Array.isArray(r.manifest.css) ? r.manifest.css : [],
                    view: '/App_Plugins/Skybrud.PackageManifests/Views/manifest.files.html',
                    updated: function (p) { $scope.manifest.manifest.css = p.value; }
                },
                {
                    alias: "gridEditors",
                    label: "Grid editors",
                    value: r.manifest.propertyEditors && Array.isArray(r.manifest.gridEditors) ? r.manifest.gridEditors : [],
                    view: "/App_Plugins/Skybrud.PackageManifests/Views/manifest.gridEditors.html",
                    updated: function (p) { $scope.manifest.manifest.gridEditors = p.value; }
                },
                {
                    alias: "propertyEditors",
                    label: "Property editors",
                    value: r.manifest.propertyEditors && Array.isArray(r.manifest.propertyEditors) ? r.manifest.propertyEditors : [],
                    view: "/App_Plugins/Skybrud.PackageManifests/Views/manifest.propertyEditors.html",
                    updated: function (p) { $scope.manifest.manifest.propertyEditors = p.value; }
                }
            ];
            
            $scope.$watch(function () {
                return $scope.properties;
            }, function (array) {
                angular.forEach(array, function (property) {
                    property.updated(property);
                });
            }, true);

            navigationService.syncTree({ tree: "packageManifests", path: id });

        });

    } else if (id.length == 3) {

        if (id[1] == 'propertyEditors') {

            $http.get('/umbraco/backoffice/Skybrud.PackageManifests/Manifests/GetPropertyEditor?alias=' + $routeParams.id).success(function (r) {
                if (!r.icon) r.icon = 'icon-autofill';
                $scope.propertyEditor = r;
                $scope.name = r.name;
                $scope.properties = [
                    {
                        alias: 'group',
                        label: 'Group',
                        description: 'The group to place this editor in within the <strong>Select Editor</strong> dialog. Use a new group name or alternatively use an existing one such as <strong>Pickers</strong>.',
                        hideLabel: false,
                        value: r.group ? r.group : '',
                        view: 'textbox',
                        updated: function (p) { $scope.propertyEditor.group = p.value; }
                    },
                    {
                        alias: 'editor.view',
                        label: 'View',
                        description: 'This is the full path to the HTML view for your property editor',
                        hideLabel: false,
                        value: r.editor && r.editor.view ? r.editor.view : '',
                        view: 'textbox',
                        updated: function (p) { $scope.propertyEditor.editor.view = p.value; }
                    },
                    {
                        alias: 'editor.hideLabel',
                        label: 'Hide label?',
                        description: 'If set to true this hides the label for the property editor when used in Umbraco on a document type.',
                        hideLabel: false,
                        value: r.editor && r.editor.hideLabel === true,
                        view: 'boolean',
                        updated: function (p) { $scope.propertyEditor.editor.hideLabel = p.value; }
                    },
                    {
                        alias: 'isParameterEditor',
                        label: 'Is parameter editor?',
                        description: 'Enables the property editor as a macro parameter editor can be true/false.',
                        hideLabel: false,
                        value: r.editor && r.editor.isParameterEditor === true,
                        view: 'boolean',
                        updated: function (p) { $scope.propertyEditor.isParameterEditor = p.value; }
                    },
                    {
                        alias: 'editor.valueType',
                        label: 'Value type',
                        description: 'This is the type of data you want your property editor to save to Umbraco.',
                        hideLabel: false,
                        value: r.editor ? r.editor.valueType : '',
                        view: '/App_Plugins/Skybrud.PackageManifests/Views/editor.valuetype.html',
                        updated: function (p) { $scope.propertyEditor.editor.valueType = p.value; }
                    },
                    {
                        alias: 'prevalues.fields',
                        label: 'Prevalue fields',
                        hideLabel: false,
                        value: r.prevalues,
                        view: '/App_Plugins/Skybrud.PackageManifests/Views/prevalues.fields.html',
                        updated: function (p) { $scope.propertyEditor.prevalues = p.value; }
                    }
                ];
                
                var temp = [];
                angular.forEach(id, function (e) {
                    temp.push(e);
                    $scope.path.push(temp.join(','));
                });
                
                navigationService.syncTree({ tree: 'packageManifests', path: $scope.path });

                $scope.$watch(function () {
                    return $scope.properties;
                }, function (array) {
                    if (!$scope.propertyEditor.editor.view) $scope.propertyEditor.editor.view = {};
                    angular.forEach(array, function (property) {
                        property.updated(property);
                    });
                }, true);

            });

        } else if (id[1] == 'gridEditors') {

            $http.get('/umbraco/backoffice/Skybrud.PackageManifests/Manifests/GetGridEditor?alias=' + $routeParams.id).success(function (r) {
                $scope.gridEditor = r;
                $scope.name = r.name;
            });

        }

    }

});


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