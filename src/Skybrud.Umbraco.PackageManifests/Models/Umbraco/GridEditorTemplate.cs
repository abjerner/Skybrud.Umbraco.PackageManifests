using System;
using Newtonsoft.Json;

namespace Skybrud.Umbraco.PackageManifests.Models.Umbraco {

    public class GridEditorTemplate {

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("group")]
        public string Group { get; set; }

        [JsonProperty("icon")]
        public string Icon { get; set; }

        [JsonProperty("view")]
        public string View { get; set; }

        [JsonProperty("config")]
        public string Config { get; set; }

        [JsonProperty("editor")]
        public GridEditor Editor { get; set; }

        public GridEditorTemplate() {
            Name = String.Empty;
            Icon = String.Empty;
            Group = String.Empty;
            View = String.Empty;
            Config = String.Empty;
            Editor = new GridEditor();
        }

    }

}