using System.Globalization;
using System.Net.Http.Formatting;
using Skybrud.Umbraco.PackageManifests.Models;
using Umbraco.Core;
using Umbraco.Web.Models.Trees;
using Umbraco.Web.Mvc;
using Umbraco.Web.Trees;

namespace Skybrud.Umbraco.PackageManifests.Controllers.Trees {

    //[Tree(Constants.Applications.Settings, "skybrud.analytics", "Skybrud.Analytics", "icon-folder", "icon-folder", sortOrder: 15)]
    //[Tree("sectionAlias", "treeAlias", "icon-folder", "icon-folder", true, 15, "Skybrud", "Skybrud.Analytics")]
    [Tree(Constants.Applications.Settings, "packageManifests", IsSingleNodeTree = true, SortOrder = 3, TreeGroup = Constants.Trees.Groups.Settings, TreeTitle = "Package Manifests")]
    [PluginController("PackageManifests")]
    public class ManifestsTreeController : TreeController {

        protected override TreeNodeCollection GetTreeNodes(string id, FormDataCollection queryStrings) {

            TreeNodeCollection nodes = new TreeNodeCollection();

            ManifestService service = new ManifestService();

            foreach (PackageManifestItem manifest in service.GetManifestItems()) {
                nodes.Add(CreateTreeNode(manifest.Alias, id, queryStrings, manifest.Name, "icon-tools", false));
            }

            return nodes;

        }

        protected override MenuItemCollection GetMenuForNode(string id, FormDataCollection queryStrings) {

            MenuItemCollection collection = new MenuItemCollection();

            return collection;

        }

    }

}