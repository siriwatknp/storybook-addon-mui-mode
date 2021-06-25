import React from "react";

const withMuiTheme = (Story, context) => {
  return <Story {...context} />;
};

export const decorators = [withMuiTheme];
