using System;
using Newtonsoft.Json;

namespace Skybrud.Umbraco.PackageManifests.Models.Umbraco {

    public class PropertyEditorPreValueField {

        [JsonProperty("key")]
        public string Key { get; set; }

        [JsonProperty("label")]
        public string Label { get; set; }

        [JsonProperty("description")]
        public string Description { get; set; }

        [JsonProperty("view")]
        public string View { get; set; }

        [JsonProperty("validation")]
        public object Validation { get; set; }

        public bool ShouldSerializeDescription() {
            return String.IsNullOrWhiteSpace(Description) == false;
        }

        public bool ShouldSerializeValidation() {
            return Validation != null;
        }

    }

}