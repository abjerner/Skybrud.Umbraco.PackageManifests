using System.Net.Http.Formatting;
using Skybrud.Umbraco.PackageManifests.Models;
using umbraco.BusinessLogic.Actions;
using Umbraco.Core;
using Umbraco.Core.Services;
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

            foreach (PackageManifestItem manifest in service.GetManifestItems()) {
                nodes.Add(CreateTreeNode(manifest.Alias, id, queryStrings, manifest.Name, "icon-tools", false));
            }

            return nodes;

        }

        protected override MenuItemCollection GetMenuForNode(string id, FormDataCollection queryStrings) {

            MenuItemCollection collection = new MenuItemCollection();

            // Add a "Reload" menu item
            if (id == Constants.System.Root.ToInvariantString()) {
                
                //set the default to create
                collection.DefaultMenuAlias = ActionNew.Instance.Alias;

                // root actions              
                collection.Items.Add<ActionNew>(Services.TextService.Localize($"actions/{ActionNew.Instance.Alias}"));
                collection.Items.Add<RefreshNode, ActionRefresh>(Services.TextService.Localize($"actions/{ActionRefresh.Instance.Alias}"), hasSeparator: true);
                return collection;
            }

            return collection;

        }

    }

}