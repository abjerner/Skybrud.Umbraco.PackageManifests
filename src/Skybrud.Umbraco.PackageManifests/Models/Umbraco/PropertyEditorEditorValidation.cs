using System;
using Newtonsoft.Json;

namespace Skybrud.Umbraco.PackageManifests.Models.Umbraco {

    public class PropertyEditorEditorValidation {

        [JsonProperty("mandatory")]
        public bool Mandatory { get; set; }

        [JsonProperty("pattern")]
        public string Pattern { get; set; }

        public bool ShouldSerialize() {
            return ShouldSerializeMandatory() || ShouldSerializePattern();
        }

        public bool ShouldSerializeMandatory() {
            return Mandatory;
        }

        public bool ShouldSerializePattern() {
            return String.IsNullOrWhiteSpace(Pattern) == false;
        }

    }

}