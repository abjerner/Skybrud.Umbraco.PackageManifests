using System.Globalization;
using System.Net.Http.Formatting;
using Skybrud.Umbraco.PackageManifests.Models;
using umbraco.BusinessLogic.Actions;
using Umbraco.Web.Models.Trees;
using Umbraco.Web.Mvc;
using Umbraco.Web.Trees;

namespace Skybrud.Umbraco.PackageManifests.Controllers {

    [Tree("developer", "packageManifests", "Package Manifests")]
    [PluginController("PackageManifests")]
    public class ManifestsTreeController : TreeController {

        protected override TreeNodeCollection GetTreeNodes(string id, FormDataCollection queryStrings) {

            TreeNodeCollection nodes = new TreeNodeCollection();

            ManifestService service = new ManifestService();

            foreach (PackageManifestItem manifest in service.GetManifests()) {
                nodes.Add(CreateTreeNode(manifest.Alias, id, queryStrings, manifest.Name, "icon-tools", false));
            }

            return nodes;

        }

        protected override MenuItemCollection GetMenuForNode(string id, FormDataCollection queryStrings) {

            MenuItemCollection collection = new MenuItemCollection();

            // Add a "Reload" menu item
            collection.Items.Add<RefreshNode, ActionRefresh>(Localize("actions/" + ActionRefresh.Instance.Alias));

            return collection;

        }

        private string Localize(string key) {
            return ApplicationContext.Services.TextService.Localize(key, CultureInfo.CurrentCulture);
        }

    }

}