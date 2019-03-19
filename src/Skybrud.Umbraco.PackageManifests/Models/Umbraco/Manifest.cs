using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;
using Skybrud.Umbraco.PackageManifests.Models.Umbraco.ContentApps;
using Skybrud.Umbraco.PackageManifests.Models.Umbraco.Dashboards;
using Skybrud.Umbraco.PackageManifests.Models.Umbraco.Sections;

namespace Skybrud.Umbraco.PackageManifests.Models.Umbraco {

    public class Manifest {

        [JsonProperty("javascript")]
        public string[] JavaScript { get; set; }

        [JsonProperty("css")]
        public string[] Css { get; set; }

        [JsonProperty("propertyEditors")]
        public List<PropertyEditor> PropertyEditors { get; set; }

        //[JsonProperty("parameterEditors", NullValueHandling = NullValueHandling.Ignore)]
        //public UmbracoPackageParameterEditor[] ParameterEditors { get; set; }

        [JsonProperty("gridEditors")]
        public List<GridEditor> GridEditors { get; set; }

        [JsonProperty("gridEditorTemplates")]
        public List<GridEditorTemplate> GridEditorTemplates { get; set; }

        [JsonProperty("contentApps")]
        public List<ContentApp> ContentApps { get; set; }

        [JsonProperty("dashboards")]
        public List<Dashboard> Dashboards { get; set; }

        [JsonProperty("sections")]
        public List<Section> Sections { get; set; }

        #region Member methods

        public bool ShouldSerializeJavaScript() {
            return JavaScript != null && JavaScript.Any();
        }

        public bool ShouldSerializeCss() {
            return Css != null && Css.Any();
        }

        public bool ShouldSerializePropertyEditors() {
            return PropertyEditors != null && PropertyEditors.Any();
        }

        public bool ShouldSerializeGridEditors() {
            return GridEditors != null && GridEditors.Any();
        }

        public bool ShouldSerializeGridEditorTemplates() {
            return GridEditorTemplates != null && GridEditorTemplates.Any();
        }

        public bool ShouldSerializeContentApps() {
            return ContentApps != null && ContentApps.Any();
        }

        public bool ShouldSerializeDashboards() {
            return Dashboards != null && Dashboards.Any();
        }

        public bool ShouldSerializeSections() {
            return Sections != null && Sections.Any();
        }

        #endregion

    }

}