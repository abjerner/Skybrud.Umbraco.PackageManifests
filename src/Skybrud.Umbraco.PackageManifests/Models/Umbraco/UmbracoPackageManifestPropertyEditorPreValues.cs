using Newtonsoft.Json;

namespace Skybrud.Umbraco.PackageManifests.Models.Umbraco {
    public class UmbracoPackageManifestPropertyEditorPreValues {

        [JsonProperty("fields")]
        public object[] Fields { get; set; }

    }

}