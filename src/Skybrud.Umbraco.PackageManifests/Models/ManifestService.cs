using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Skybrud.Essentials.Json;
using Skybrud.Umbraco.PackageManifests.Models.Umbraco;
using Umbraco.Core.IO;

namespace Skybrud.Umbraco.PackageManifests.Models {

    public class ManifestService {

        public PackageManifest[] GetManifests() {
            
            List<PackageManifest> manifests = new List<PackageManifest>();

            foreach (DirectoryInfo dir in new DirectoryInfo(IOHelper.MapPath("~/App_Plugins/")).GetDirectories()) {
                if (File.Exists(dir.FullName + "/package.manifest")) {
                    manifests.Add(PackageManifest.Load(dir.FullName + "/package.manifest"));
                }
            }

            return manifests.ToArray();

        }

        public PackageManifestItem[] GetManifestItems() {
            
            List<PackageManifestItem> manifests = new List<PackageManifestItem>();

            foreach (DirectoryInfo dir in new DirectoryInfo(IOHelper.MapPath("~/App_Plugins/")).GetDirectories()) {
                if (File.Exists(dir.FullName + "/package.manifest")) {
                    manifests.Add(PackageManifestItem.Load(dir.FullName + "/package.manifest"));
                }
            }

            return manifests.ToArray();

        }

        public PackageManifest GetManifestByAlias(string alias) {

            if (String.IsNullOrWhiteSpace(alias)) throw new ArgumentNullException(nameof(alias));
            if (!Regex.IsMatch(alias, "^[a-zA-Z0-9_\\.-]+$")) throw new ArgumentException("Invalid alias", nameof(alias));

            string path = IOHelper.MapPath("~/App_Plugins/" + alias + "/package.manifest");

            return PackageManifest.Load(path);

        }

        /// <summary>
        /// Saves the specified <paramref name="manifest"/>.
        /// </summary>
        /// <param name="manifest">The manifest to be saved.</param>
        public void Save(PackageManifest manifest) {
            if (manifest == null) throw new ArgumentNullException(nameof(manifest));
            JsonUtils.SaveJsonObject(manifest.Path, JObject.FromObject(manifest.Manifest), Formatting.Indented);
        }

        /// <summary>
        /// Gets a list of all grid editor templates. Templates for packages that are not installed will be ignored.
        /// </summary>
        /// <returns>Array of <see cref="GridEditorTemplate"/>.</returns>
        public GridEditorTemplate[] GetGridEditorTemplates() {

            List<GridEditorTemplate> native = new List<GridEditorTemplate> {
                new GridEditorTemplate {
                    Name = "Blank",
                    Icon = "icon-umb-content",
                    Editor =  new GridEditor()
                }
            };

            return native.Union(
                GetManifests()
                    .SelectMany(x => x.Manifest.GridEditorTemplates ?? new List<GridEditorTemplate>())
                    .Where(IsEnabled)
                    .OrderBy(x => x.Name)
            ).ToArray();

        }

        private bool IsEnabled(GridEditorTemplate template) {
            if (String.IsNullOrWhiteSpace(template.View)) return true;
            if (template.View.StartsWith("/")) return File.Exists(IOHelper.MapPath("~" + template.View.Split('?')[0]));
            if (template.View.StartsWith("~/")) return File.Exists(IOHelper.MapPath(template.View.Split('?')[0]));
            if (Regex.IsMatch(template.View, "^[a-z0-9-]+$")) return File.Exists(IOHelper.MapPath("~/Umbraco/Views/propertyeditors/grid/editors/" + template.View + ".html"));
            return false;
        }

    }

}