using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Http;
using Skybrud.Umbraco.PackageManifests.Models;
using Skybrud.Umbraco.PackageManifests.Models.Umbraco;
using Umbraco.Core.IO;
using Umbraco.Web.Mvc;
using Umbraco.Web.WebApi;

namespace Skybrud.Umbraco.PackageManifests.Controllers {

    [PluginController("Skybrud")]
    [AngularJsonOnlyConfiguration]
    public class PackageManifestsController : UmbracoAuthorizedApiController {

        protected readonly ManifestService Manifests = new ManifestService();

        public object GetManifestByAlias(string alias) {

            if (String.IsNullOrWhiteSpace(alias)) {
                return Request.CreateResponse(HttpStatusCode.BadRequest, "No alias specified");
            }

            if (!Regex.IsMatch(alias, "^[a-zA-Z0-9_\\.-]+$")) {
                return Request.CreateResponse(HttpStatusCode.BadRequest, "Invalid alias specified");
            }

            PackageManifest manifest = Manifests.GetManifestByAlias(alias);
            if (manifest == null) return Request.CreateResponse(HttpStatusCode.NotFound, "Manifest not found");

            return Json(manifest);

        }

        [HttpPut]
        public object CreateManifest(string packageAlias) {

            if (string.IsNullOrWhiteSpace(packageAlias)) return Error(HttpStatusCode.BadRequest, "No package alias specified.");
            if (!Regex.IsMatch(packageAlias, "^[a-zA-Z0-9_\\.-]+$")) return Error(HttpStatusCode.BadRequest, "Package alias must be an alphanumeric value.");

            string path1 = IOHelper.MapPath($"~/App_Plugins/{packageAlias}");
            string path2 = IOHelper.MapPath($"~/App_Plugins/{packageAlias}/package.manifest");

            if (System.IO.File.Exists(path2)) {
                return Error(HttpStatusCode.Conflict, "A package manifest with the specified alias already exists.");
            }

            System.IO.Directory.CreateDirectory(path1);

            System.IO.File.WriteAllText(path2, "{}", Encoding.UTF8);

            PackageManifest manifest = Manifests.GetManifestByAlias(packageAlias);

            return Json(manifest);

        }
        
        public object PostManifest(string packageAlias, [FromBody] Manifest manifest) {

            if (String.IsNullOrWhiteSpace(packageAlias)) return Request.CreateResponse(HttpStatusCode.BadRequest, "No package alias specified");
            if (!Regex.IsMatch(packageAlias, "^[a-zA-Z0-9_\\.-]+$")) return Request.CreateResponse(HttpStatusCode.BadRequest, "Invalid package alias specified");

            // Look for a manifest matching the alias
            PackageManifest existingManifest = Manifests.GetManifestByAlias(packageAlias);
            if (existingManifest == null) return Request.CreateResponse(HttpStatusCode.NotFound, "Manifest not found");

            // TODO: Validate the property editor from the body

            // Update the properties
            existingManifest.Manifest.JavaScript = (manifest.JavaScript ?? new string[0]).OrderBy(x => x).ToArray();
            existingManifest.Manifest.Css = (manifest.Css ?? new string[0]).OrderBy(x => x).ToArray();
            existingManifest.Manifest.PropertyEditors = manifest.PropertyEditors;
            existingManifest.Manifest.GridEditors = manifest.GridEditors;

            // Save the alias to disk
            Manifests.Save(existingManifest);

            return existingManifest;

        }

        [HttpGet]
        public object GetGridEditorTemplates() {
            return Json(
                Manifests
                    .GetGridEditorTemplates()
                    .GroupBy(x => String.IsNullOrWhiteSpace(x.Group) ? "Common" : x.Group)
                    .OrderBy(x => (x.Key == "Common" ? 0 : 1) + x.Key)
                    .Select(x => new {
                        name = x.Key,
                        templates = x
                    })
            );
        }

        private object Error(HttpStatusCode code, string message) {
            return Request.CreateResponse(code, new {data = new {message}});
        }

    }

}