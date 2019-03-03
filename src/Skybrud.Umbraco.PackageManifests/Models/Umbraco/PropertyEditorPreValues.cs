using Newtonsoft.Json;

namespace Skybrud.Umbraco.PackageManifests.Models.Umbraco {

    public class PropertyEditorPreValues {

        [JsonProperty("fields")]
        public PropertyEditorPreValueField[] Fields { get; set; }

    }

}