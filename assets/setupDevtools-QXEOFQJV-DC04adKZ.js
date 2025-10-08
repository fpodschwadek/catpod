import { s as setupDevToolsPlugin, C as COMPONENT_STATE_TYPE, I as INSPECTOR_LABEL, a as INSPECTOR_ID, b as INSPECTOR_NODES, c as INSPECTOR_STATE_SECTION_NAME, w as watch, P as PLUGIN_LABEL, d as PLUGIN_ID } from "./app-BEZjXdGt.js";
var setupDevtools = (app, clientData) => {
  setupDevToolsPlugin(
    {
      // fix recursive reference
      app,
      id: PLUGIN_ID,
      label: PLUGIN_LABEL,
      packageName: "@vuepress/client",
      homepage: "https://vuepress.vuejs.org",
      logo: "https://vuepress.vuejs.org/images/hero.png",
      componentStateTypes: [COMPONENT_STATE_TYPE]
    },
    (api) => {
      const clientDataEntries = Object.entries(clientData);
      const clientDataKeys = Object.keys(clientData);
      const clientDataValues = Object.values(clientData);
      api.on.inspectComponent((payload) => {
        payload.instanceData.state.push(
          ...clientDataEntries.map(([name, item]) => ({
            type: COMPONENT_STATE_TYPE,
            editable: false,
            key: name,
            value: item.value
          }))
        );
      });
      api.addInspector({
        id: INSPECTOR_ID,
        label: INSPECTOR_LABEL,
        icon: "article"
      });
      api.on.getInspectorTree((payload) => {
        if (payload.inspectorId !== INSPECTOR_ID) return;
        payload.rootNodes = Object.values(INSPECTOR_NODES).map(
          (node) => ({
            id: node.id,
            label: node.label,
            children: node.keys.map((key) => ({
              id: key,
              label: key
            }))
          })
        );
      });
      api.on.getInspectorState((payload) => {
        if (payload.inspectorId !== INSPECTOR_ID) return;
        const inspectorNode = INSPECTOR_NODES[payload.nodeId];
        if (inspectorNode) {
          payload.state = {
            [inspectorNode.label]: inspectorNode.keys.map((key) => ({
              key,
              value: clientData[key].value
            }))
          };
          return;
        }
        if (clientDataKeys.includes(payload.nodeId)) {
          payload.state = {
            [INSPECTOR_STATE_SECTION_NAME]: [
              {
                key: payload.nodeId,
                value: clientData[payload.nodeId].value
              }
            ]
          };
        }
      });
      watch(clientDataValues, () => {
        api.notifyComponentUpdate();
        api.sendInspectorState(INSPECTOR_ID);
      });
    }
  );
};
export {
  setupDevtools
};
