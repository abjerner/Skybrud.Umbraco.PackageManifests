using System.Globalization;
using System.Net.Http.Formatting;
using System.Text.RegularExpressions;
using Skybrud.Umbraco.PackageManifests.Models;
using Skybrud.Umbraco.PackageManifests.Models.Umbraco;
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
            
            Match m1 = Regex.Match(id, "^([a-zA-Z0-9_\\.-]+)$");
            Match m2 = Regex.Match(id, "^([a-zA-Z0-9_\\.-]+)\\,propertyEditors$");
            Match m3 = Regex.Match(id, "^([a-zA-Z0-9_\\.-]+)\\,gridEditors$");

            if (id == "-1") {
                foreach (PackageManifestItem manifest in service.GetManifests()) {
                    nodes.Add(CreateTreeNode(manifest.Alias, id, queryStrings, manifest.Name, "icon-tools", true));
                }
                return nodes;
            }

            return nodes;

            PackageManifest pm = PackageManifest.LoadByAlias(id.Split(',')[0]);

            if (m1.Success) {
                
                nodes.Add(CreateTreeNode(pm.Alias + ",propertyEditors", id, queryStrings, "Property Editors", "icon-folder", pm.HasPropertyEditors));
                nodes.Add(CreateTreeNode(pm.Alias + ",gridEditors", id, queryStrings, "Grid Editors", "icon-folder", pm.HasGridEditors));

            } else if (m2.Success) {

                if (pm.HasPropertyEditors) {
                    foreach (UmbracoPackageManifestPropertyEditor editor in pm.Manifest.PropertyEditors) {
                        nodes.Add(CreateTreeNode(pm.Alias + ",propertyEditors," + editor.Alias, id, queryStrings, editor.Name, "icon-autofill", false));
                    }
                }

            } else if (m3.Success) {

                if (pm.HasGridEditors) {
                    foreach (UmbracoPackageManifestGridEditor editor in pm.Manifest.GridEditors) {
                        nodes.Add(CreateTreeNode(pm.Alias + ",gridEditors," + editor.Alias, id, queryStrings, editor.Name, "icon-layout", false));
                    }
                }

            }

            //nodes.Add(CreateTreeNode("1234", "1234", queryStrings, "Property editors: " + (pm.HasPropertyEditors ? pm.Manifest.PropertyEditors.Length : 0), "icon-bird icon-red red"));
            //nodes.Add(CreateTreeNode("1234", "1234", queryStrings, "Grid editors: " + (pm.HasGridEditors ? pm.Manifest.GridEditors.Length : 0), "icon-bird icon-red red"));
            //nodes.Add(CreateTreeNode("1234", "1234", queryStrings, "ID: " + id, "icon-bird icon-red red"));
            //nodes.Add(CreateTreeNode("1234", "1234", queryStrings, "" + m1.Success, "icon-bird icon-red red"));
            //nodes.Add(CreateTreeNode("1234", "1234", queryStrings, "" + m2.Success, "icon-bird icon-red red"));
            //nodes.Add(CreateTreeNode("1234", "1234", queryStrings, "" + m3.Success, "icon-bird icon-red red"));

            return nodes;

        }

        protected override MenuItemCollection GetMenuForNode(string id, FormDataCollection queryStrings) {

            MenuItemCollection collection = new MenuItemCollection();

            // Add a "Reload" menu item
            if (true) {
                collection.Items.Add<RefreshNode, ActionRefresh>(Localize("actions/" + ActionRefresh.Instance.Alias));
            }
            
            Match m1 = Regex.Match(id, "^([a-zA-Z0-9_\\.-]+)\\,(propertyEditors|gridEditors)\\,([a-zA-Z0-9_\\.-]+)$");

            if (m1.Success) {
                collection.Items.Add<ActionDelete>(Localize("actions/" + ActionDelete.Instance.Alias), id, "hest");
            }

            return collection;

        }

        private string Localize(string key) {
            return ApplicationContext.Services.TextService.Localize(key, CultureInfo.CurrentCulture);
        }

    }

}