using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace Skybrud.Umbraco.PackageManifests.Models.Umbraco {

    public class UmbracoPackageManifestPropertyEditorEditor {

        [JsonProperty("view")]
        public string View { get; set; }

        [JsonProperty("hideLabel")]
        public bool HideLabel { get; set; }

        [JsonProperty("valueType")]
        public string ValueType { get; set; }

        [JsonProperty("validation", NullValueHandling = NullValueHandling.Ignore)]
        public JObject Validation { get; set; }

        [JsonProperty("isReadOnly")]
        public bool IsReadOnly { get; set; }

        public bool ShouldSerializeIsReadOnly() {
            return IsReadOnly;
        }

    }

}