using System;
using System.Linq;
using System.Text.RegularExpressions;
using Newtonsoft.Json;
using Skybrud.Essentials.Json;
using Skybrud.Umbraco.PackageManifests.Models.Umbraco;
using Umbraco.Core.IO;

namespace Skybrud.Umbraco.PackageManifests.Models {

    public class PackageManifest {

        [JsonIgnore]
        public string Path { get; private set; }

        [JsonProperty("name")]
        public string Name { get; private set; }

        [JsonProperty("alias")]
        public string Alias { get; private set; }

        [JsonProperty("manifest")]
        public Manifest Manifest { get; set; }

        [JsonIgnore]
        public bool HasPropertyEditors => Manifest.PropertyEditors != null && Manifest.PropertyEditors.Count > 0;

        [JsonIgnore]
        public bool HasGridEditors => Manifest.GridEditors != null && Manifest.GridEditors.Count > 0;

        [JsonIgnore]
        public bool HasJavaScript => Manifest.JavaScript != null && Manifest.JavaScript.Length > 0;

        [JsonIgnore]
        public bool HasCss => Manifest.Css != null && Manifest.Css.Length > 0;

        public PropertyEditor GetPropertyEditor(string alias) {
            return Manifest.PropertyEditors?.FirstOrDefault(x => x.Alias == alias);
        }

        public GridEditor GetGridEditor(string alias) {
            return Manifest.GridEditors?.FirstOrDefault(x => x.Alias == alias);
        }

        public static PackageManifest Load(string path) {

            // TODO: Validate the path

            PackageManifest manifest = new PackageManifest();

            manifest.Path = path;
            manifest.Name = System.IO.Path.GetDirectoryName(path).Split('\\').Last();
            manifest.Alias = manifest.Name;//.ToUrlSegment();

            manifest.Manifest = JsonUtils.LoadJsonObject(path).ToObject<Manifest>();

            return manifest;

        }

        public static PackageManifest LoadByAlias(string alias) {
            if (String.IsNullOrWhiteSpace(alias)) throw new ArgumentNullException(nameof(alias));
            if (!Regex.IsMatch(alias, "^[a-zA-Z0-9_\\.-]+$")) throw new ArgumentException("Invalid alias", nameof(alias));
            return Load(IOHelper.MapPath("~/App_Plugins/" + alias + "/package.manifest"));
        }

    }

}