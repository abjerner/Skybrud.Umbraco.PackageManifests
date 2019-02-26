using System;
using System.Collections.Generic;
using System.IO;
using System.Text.RegularExpressions;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Skybrud.Essentials.Json;
using Umbraco.Core.IO;

namespace Skybrud.Umbraco.PackageManifests.Models {

    public class ManifestService {

        public PackageManifestItem[] GetManifests() {
            
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

        public void Save(PackageManifest manifest) {

            if (manifest == null) throw new ArgumentNullException(nameof(manifest));

            JsonUtils.SaveJsonObject(manifest.Path, JObject.FromObject(manifest.Manifest), Formatting.Indented);

        }

    }

}