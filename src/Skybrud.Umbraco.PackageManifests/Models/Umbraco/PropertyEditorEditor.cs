using Newtonsoft.Json;

namespace Skybrud.Umbraco.PackageManifests.Models.Umbraco {

    public class PropertyEditorEditor {

        [JsonProperty("view")]
        public string View { get; set; }

        [JsonProperty("hideLabel")]
        public bool HideLabel { get; set; }

        [JsonProperty("valueType")]
        public string ValueType { get; set; }

        [JsonProperty("validation", NullValueHandling = NullValueHandling.Ignore)]
        public PropertyEditorEditorValidation Validation { get; set; }

        [JsonProperty("isReadOnly")]
        public bool IsReadOnly { get; set; }

        public bool ShouldSerializeValidation() {
            return Validation != null && Validation.ShouldSerialize();
        }

        public bool ShouldSerializeIsReadOnly() {
            return IsReadOnly;
        }

    }

}