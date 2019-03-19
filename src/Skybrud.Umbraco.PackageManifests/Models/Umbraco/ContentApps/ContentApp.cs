using System;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace Skybrud.Umbraco.PackageManifests.Models.Umbraco.ContentApps {

    public class ContentApp {

        [JsonProperty("alias")]
        public string Alias { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("weight")]
        public int Weight { get; set; }

        [JsonProperty("icon")]
        public string Icon { get; set; }

        [JsonProperty("view")]
        public string View { get; set; }

        [JsonProperty("show")]
        public JArray Show { get; set; }

        public bool ShouldSerializeShow() {
            return Show?.Count > 0;
        }

        public ContentApp() {
            Name = String.Empty;
            Alias = String.Empty;
            Icon = String.Empty;
            View = String.Empty;
        }

    }

}
