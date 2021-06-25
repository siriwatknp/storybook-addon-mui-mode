import React, { useEffect, useCallback } from "react";
import { useGlobals, useParameter } from "@storybook/api";
import styled from "@emotion/styled";

import { TOOL_ID } from "./constants";
import { SvgMuiDark, SvgMuiLight, GoogleFontSelect } from "./components";

const ToggleButton = styled.button(({ active }) => ({
  borderRadius: 4,
  minWidth: 28,
  minHeight: 28,
  display: "inline-flex",
  alignItems: "center",
  border: "none",
  backgroundColor: "unset",
  ...(!active && {
    "&:hover": {
      backgroundColor: "#f5f5f5",
    },
  }),
  ...(active && {
    backgroundColor: "rgba(30,167,253,0.24)",
  }),
}));

const Group = styled.div({
  alignSelf: "center",
  display: "flex",
  gap: 4,
});

export const ModeTool = () => {
  const [{ muiMode = "light" }, updateGlobals] = useGlobals();

  const toggleMode = useCallback(
    (value) =>
      updateGlobals({
        muiMode: value,
      }),
    [muiMode]
  );

  const turnDark = () => toggleMode("dark");
  const turnLight = () => toggleMode("light");

  useEffect(() => {
    turnDark();
  }, []);
  return (
    <Group key={TOOL_ID}>
      <ToggleButton
        title="Light mode"
        active={muiMode === "light"}
        onClick={turnLight}
      >
        <SvgMuiLight />
      </ToggleButton>
      <ToggleButton
        title="Dark mode"
        active={muiMode === "dark"}
        onClick={turnDark}
      >
        <SvgMuiDark />
      </ToggleButton>
    </Group>
  );
};

export const FontTool = () => {
  const [{ googleFont }, updateGlobals] = useGlobals();
  const parameters = useParameter() || {};

  const selectFont = ({ value }) => {
    if (value) {
      updateGlobals({
        googleFont: value,
      });
    }
  };

  useEffect(() => {
    if (parameters.googleFont) {
      selectFont({ value: parameters.googleFont });
    }
  }, [parameters.googleFont]);

  return (
    <GoogleFontSelect
      {...(googleFont && {
        value: { label: googleFont, value: googleFont, family: googleFont },
      })}
      getOptionValue={({ family }) => family}
      onChange={selectFont}
      apiKey={process.env.GOOGLE_FONT_API_KEY}
    />
  );
};
