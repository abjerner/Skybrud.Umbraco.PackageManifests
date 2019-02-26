using System;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace Skybrud.Umbraco.PackageManifests.Models.Umbraco {
    public class UmbracoPackageManifestGridEditor {

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("alias")]
        public string Alias { get; set; }

        [JsonProperty("icon")]
        public string Icon { get; set; }

        [JsonProperty("view")]
        public string View { get; set; }

        [JsonProperty("render")]
        public string Render { get; set; }

        [JsonProperty("config")]
        public JToken Config { get; set; }

        public bool ShouldSerializeIcon() {
            return String.IsNullOrWhiteSpace(Icon) == false;
        }

        public bool ShouldSerializeRender() {
            return String.IsNullOrWhiteSpace(Render) == false;
        }

    }

}