using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text.RegularExpressions;
using System.Web.Http;
using Skybrud.Umbraco.PackageManifests.Models;
using Skybrud.Umbraco.PackageManifests.Models.Umbraco;
using Umbraco.Web.Mvc;
using Umbraco.Web.WebApi;

namespace Skybrud.Umbraco.PackageManifests.Controllers {

    [PluginController("PackageManifests")]
    [AngularJsonOnlyConfiguration]
    public class ManifestsController : UmbracoAuthorizedApiController {

        public object GetManifestByAlias(string alias) {

            if (String.IsNullOrWhiteSpace(alias)) {
                return Request.CreateResponse(HttpStatusCode.BadRequest, "No alias specified");
            }

            if (!Regex.IsMatch(alias, "^[a-zA-Z0-9_\\.-]+$")) {
                return Request.CreateResponse(HttpStatusCode.BadRequest, "Invalid alias specified");
            }

            ManifestService service = new ManifestService();

            PackageManifest manifest = service.GetManifestByAlias(alias);

            if (manifest == null) {
                return Request.CreateResponse(HttpStatusCode.NotFound, "Manifest not found");
            }

            return manifest;

        }
        
        public object PostManifest(string packageAlias, [FromBody] UmbracoPackageManifest manifest) {

            if (String.IsNullOrWhiteSpace(packageAlias)) return Request.CreateResponse(HttpStatusCode.BadRequest, "No package alias specified");
            if (!Regex.IsMatch(packageAlias, "^[a-zA-Z0-9_\\.-]+$")) return Request.CreateResponse(HttpStatusCode.BadRequest, "Invalid package alias specified");
            
            ManifestService service = new ManifestService();

            PackageManifest existingManifest = service.GetManifestByAlias(packageAlias);
            if (existingManifest == null) return Request.CreateResponse(HttpStatusCode.NotFound, "Manifest not found");

            // TODO: Validate the property editor from the body

            // Update the properties
            existingManifest.Manifest.JavaScript = manifest.JavaScript;
            existingManifest.Manifest.Css = manifest.Css;
            existingManifest.Manifest.PropertyEditors = manifest.PropertyEditors;
            existingManifest.Manifest.GridEditors = manifest.GridEditors;

            service.Save(existingManifest);

            return existingManifest;

        }

        public object GetPropertyEditor(string alias) {

            if (String.IsNullOrWhiteSpace(alias)) {
                return Request.CreateResponse(HttpStatusCode.BadRequest, "No alias specified");
            }

            string[] pieces = alias.Split(',');

            if (pieces.Length != 3) return Request.CreateResponse(HttpStatusCode.BadRequest, "Invalid alias specified");

            string packageAlias = pieces[0];
            string propertyEditorAlias = pieces[2];

            if (!Regex.IsMatch(packageAlias, "^[a-zA-Z0-9_\\.-]+$")) return Request.CreateResponse(HttpStatusCode.BadRequest, "Invalid alias specified");
            if (!Regex.IsMatch(propertyEditorAlias, "^[a-zA-Z0-9_\\.-]+$")) return Request.CreateResponse(HttpStatusCode.BadRequest, "Invalid alias specified");

            ManifestService service = new ManifestService();

            PackageManifest manifest = service.GetManifestByAlias(packageAlias);
            if (manifest == null) return Request.CreateResponse(HttpStatusCode.NotFound, "Manifest not found");

            UmbracoPackageManifestPropertyEditor propertyEditor = manifest.GetPropertyEditor(propertyEditorAlias);
            if (propertyEditor == null) return Request.CreateResponse(HttpStatusCode.NotFound, "Property editor not found");

            return propertyEditor;

        }

        
        public object PostPropertyEditor(string packageAlias, string editorAlias, [FromBody] UmbracoPackageManifestPropertyEditor propertyEditor) {

            if (String.IsNullOrWhiteSpace(packageAlias)) return Request.CreateResponse(HttpStatusCode.BadRequest, "No package alias specified");
            if (!Regex.IsMatch(packageAlias, "^[a-zA-Z0-9_\\.-]+$")) return Request.CreateResponse(HttpStatusCode.BadRequest, "Invalid package alias specified");

            if (String.IsNullOrWhiteSpace(editorAlias)) return Request.CreateResponse(HttpStatusCode.BadRequest, "No editor alias specified");
            if (!Regex.IsMatch(editorAlias, "^[a-zA-Z0-9_\\.-]+$")) return Request.CreateResponse(HttpStatusCode.BadRequest, "Invalid editor alias specified");

            ManifestService service = new ManifestService();

            PackageManifest manifest = service.GetManifestByAlias(packageAlias);
            if (manifest == null) return Request.CreateResponse(HttpStatusCode.NotFound, "Manifest not found");

            // TODO: Validate the property editor from the body

            bool isReplaced = false;

            // Initialize a new list if not already present
            if (manifest.Manifest.PropertyEditors == null) manifest.Manifest.PropertyEditors = new List<UmbracoPackageManifestPropertyEditor>();

            int i = 0;
            foreach (var pe in manifest.Manifest.PropertyEditors) {
                if (pe.Alias == editorAlias) {
                    manifest.Manifest.PropertyEditors[i] = propertyEditor;
                    isReplaced = true;
                    break;
                }
                i++;
            }

            if (!isReplaced) manifest.Manifest.PropertyEditors.Add(propertyEditor);

            service.Save(manifest);

            return propertyEditor;

        }

        [HttpDelete]
        public object DeletePropertyEditor(string packageAlias, string editorAlias) {

            if (String.IsNullOrWhiteSpace(packageAlias)) return Request.CreateResponse(HttpStatusCode.BadRequest, "No package alias specified");
            if (!Regex.IsMatch(packageAlias, "^[a-zA-Z0-9_\\.-]+$")) return Request.CreateResponse(HttpStatusCode.BadRequest, "Invalid package alias specified");

            if (String.IsNullOrWhiteSpace(editorAlias)) return Request.CreateResponse(HttpStatusCode.BadRequest, "No editor alias specified");
            if (!Regex.IsMatch(editorAlias, "^[a-zA-Z0-9_\\.-]+$")) return Request.CreateResponse(HttpStatusCode.BadRequest, "Invalid editor alias specified");

            ManifestService service = new ManifestService();

            PackageManifest manifest = service.GetManifestByAlias(packageAlias);
            if (manifest == null) return Request.CreateResponse(HttpStatusCode.NotFound, "Manifest not found");

            UmbracoPackageManifestPropertyEditor propertyEditor = manifest.GetPropertyEditor(editorAlias);
            if (propertyEditor == null) return Request.CreateResponse(HttpStatusCode.NotFound, "Property editor not found");

            // Remove the property editor from the list
            manifest.Manifest.PropertyEditors = manifest.Manifest.PropertyEditors.Where(x => x.Alias != editorAlias).ToList();

            // Update the property editor on disk
            service.Save(manifest);

            return propertyEditor;

        }

        public object GetGridEditor(string alias) {

            if (String.IsNullOrWhiteSpace(alias)) {
                return Request.CreateResponse(HttpStatusCode.BadRequest, "No alias specified");
            }

            string[] pieces = alias.Split(',');

            if (pieces.Length != 3) return Request.CreateResponse(HttpStatusCode.BadRequest, "Invalid alias specified");

            string packageAlias = pieces[0];
            string gridEditorAlias = pieces[2];

            if (!Regex.IsMatch(packageAlias, "^[a-zA-Z0-9_\\.-]+$")) return Request.CreateResponse(HttpStatusCode.BadRequest, "Invalid alias specified");
            if (!Regex.IsMatch(gridEditorAlias, "^[a-zA-Z0-9_\\.-]+$")) return Request.CreateResponse(HttpStatusCode.BadRequest, "Invalid alias specified");

            ManifestService service = new ManifestService();

            PackageManifest manifest = service.GetManifestByAlias(packageAlias);
            if (manifest == null) return Request.CreateResponse(HttpStatusCode.NotFound, "Manifest not found");

            UmbracoPackageManifestGridEditor gridEditor = manifest.GetGridEditor(gridEditorAlias);
            if (gridEditor == null) return Request.CreateResponse(HttpStatusCode.NotFound, "Grid editor not found");

            return gridEditor;

        }

    }

}