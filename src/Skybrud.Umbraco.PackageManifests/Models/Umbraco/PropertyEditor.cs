using System.Linq;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace Skybrud.Umbraco.PackageManifests.Models.Umbraco {

    public class PropertyEditor {

        [JsonProperty("alias")]
        public string Alias { get; set; }

        [JsonProperty("defaultConfig")]
        public JObject DefaultConfig { get; set; }

        [JsonProperty("editor")]
        public PropertyEditorEditor Editor { get; set; }

        [JsonProperty("isParameterEditor")]
        public bool IsParameterEditor { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("icon")]
        public string Icon { get; set; }

        [JsonProperty("group")]
        public string Group { get; set; }

        [JsonProperty("prevalues", NullValueHandling = NullValueHandling.Ignore)]
        public PropertyEditorPreValues PreValues { get; set; }

        public bool ShouldSerializeDefaultConfig() {
            return DefaultConfig != null && DefaultConfig.Properties().Any();
        }

        public bool ShouldSerializeIsParameterEditor() {
            return IsParameterEditor;
        }

        public bool ShouldSerializePreValues() {
            return PreValues != null && PreValues.Fields.Length > 0;
        }

    }

}