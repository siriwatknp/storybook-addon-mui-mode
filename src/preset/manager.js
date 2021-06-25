import { addons, types } from "@storybook/addons";

import { ADDON_ID, TOOL_ID } from "../constants";
import { ModeTool, FontTool } from "../Tool";

// Register the addon
addons.register(ADDON_ID, () => {
  // Register the tool
  addons.add(TOOL_ID, {
    type: types.TOOL,
    title: "Material-UI Theme Mode",
    match: ({ viewMode }) => !!(viewMode && viewMode.match(/^(story|docs)$/)),
    render: ModeTool,
  });
  addons.add("storybook/google-font", {
    type: types.TOOL,
    title: "Google Font",
    match: ({ viewMode }) => !!(viewMode && viewMode.match(/^(story)$/)),
    render: FontTool,
  });
});
