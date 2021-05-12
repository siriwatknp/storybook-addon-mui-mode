# Storybook Addon Material-UI Mode

An addon that provide UI to toggle state between light/dark.

![image](https://user-images.githubusercontent.com/18292247/117999815-6f996e00-b36f-11eb-9504-659bbe249e3c.png)

> Works with material-ui v4, v5

## Usage

Create decorator in `.storybook/preview.js` or inside a story.

```js
// .storybook/preview.js
import { useMemo } from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

const withMuiTheme = (Story, context) => {
  const mode = context.globals?.muiMode;
  const theme = useMemo(() => createMuiTheme({
    palette: {
      mode, // for v5
      // type: mode // for v4
    }
  }), [mode])
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
    </MuiThemeProvider>
  )
}
```