using System;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace Skybrud.Umbraco.PackageManifests.Models.Umbraco.Dashboards {

    public class Dashboard {

        [JsonProperty("alias")]
        public string Alias { get; set; }

        [JsonProperty("sections")]
        public string[] Sections { get; set; }

        [JsonProperty("weight")]
        public int Weight { get; set; }

        [JsonProperty("view")]
        public string View { get; set; }

        [JsonProperty("access")]
        public JArray Access { get; set; }

        public bool ShouldSerializeAccess() {
            return Access?.Count > 0;
        }

        public Dashboard() {
            Alias = String.Empty;
            Sections = new string[0];
            Weight = 100;
            View = String.Empty;
        }

    }

}
