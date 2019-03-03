using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;

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

        #endregion

    }

}