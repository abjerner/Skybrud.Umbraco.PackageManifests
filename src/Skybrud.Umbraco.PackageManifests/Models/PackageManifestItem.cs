using System.IO;
using System.Linq;

namespace Skybrud.Umbraco.PackageManifests.Models {

    public class PackageManifestItem {

        public string Name { get; set; }

        public string Alias { get; set; }

        public static PackageManifestItem Load(string path) {
            
            PackageManifestItem manifest = new PackageManifestItem();

            manifest.Name = Path.GetDirectoryName(path).Split('\\').Last();
            manifest.Alias = manifest.Name;//.ToUrlSegment();

            return manifest;

        }


    }

}