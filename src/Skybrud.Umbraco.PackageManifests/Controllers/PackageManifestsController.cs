using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text.RegularExpressions;
using System.Web.Http;
using AutoMapper;
using Skybrud.Umbraco.PackageManifests.Models;
using Skybrud.Umbraco.PackageManifests.Models.Umbraco;
using Umbraco.Core;
using Umbraco.Core.Cache;
using Umbraco.Core.Configuration;
using Umbraco.Core.Logging;
using Umbraco.Core.Persistence;
using Umbraco.Core.Services;
using Umbraco.Web;
using Umbraco.Web.Models.ContentEditing;
using Umbraco.Web.Mvc;
using Umbraco.Web.Services;
using Umbraco.Web.WebApi;

namespace Skybrud.Umbraco.PackageManifests.Controllers {

    [PluginController("Skybrud")]
    [AngularJsonOnlyConfiguration]
    public class PackageManifestsController : UmbracoAuthorizedApiController {

        private readonly ISectionService _sectionService;

        protected readonly ManifestService Manifests = new ManifestService();

        public PackageManifestsController(
            IGlobalSettings globalSettings,
            IUmbracoContextAccessor umbracoContextAccessor,
            ISqlContext sqlContext,
            ServiceContext services,
            AppCaches appCaches,
            IProfilingLogger logger,
            IRuntimeState runtimeState,
            ISectionService sectionService,
            UmbracoHelper umbracoHelper
        ) : base(globalSettings, umbracoContextAccessor, sqlContext, services, appCaches, logger, runtimeState, umbracoHelper)
        {
            _sectionService = sectionService;
        }

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
            existingManifest.Manifest.ContentApps = manifest.ContentApps;
            existingManifest.Manifest.Dashboards = manifest.Dashboards;
            existingManifest.Manifest.Sections = manifest.Sections;

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

        [HttpGet]
        public object GetSections() {

            var sections = _sectionService.GetSections();

            var sectionModels = sections.Select(Mapper.Map<Section>).ToArray();

            return Json(sectionModels);

        }

    }

}