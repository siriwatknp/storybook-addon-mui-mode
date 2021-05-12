import React from "react";

const withMuiTheme = (Story, context) => {
  console.log(context.globals);
  return <Story {...context} />;
};

export const decorators = [withMuiTheme];
