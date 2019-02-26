using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;

namespace Skybrud.Umbraco.PackageManifests.Models.Umbraco {

    public class UmbracoPackageManifest {

        [JsonProperty("javascript")]
        public string[] JavaScript { get; set; }

        [JsonProperty("css")]
        public string[] Css { get; set; }

        [JsonProperty("propertyEditors")]
        public List<UmbracoPackageManifestPropertyEditor> PropertyEditors { get; set; }

        //[JsonProperty("parameterEditors", NullValueHandling = NullValueHandling.Ignore)]
        //public UmbracoPackageParameterEditor[] ParameterEditors { get; set; }

        [JsonProperty("gridEditors")]
        public List<UmbracoPackageManifestGridEditor> GridEditors { get; set; }

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

        #endregion

    }

}