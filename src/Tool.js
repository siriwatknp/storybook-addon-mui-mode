import React, { useEffect, useCallback } from "react";
import { useGlobals, useParameter } from "@storybook/api";
import styled from "@emotion/styled";

import { TOOL_ID } from "./constants";
import { SvgMuiDark, SvgMuiLight, GoogleFontSelect } from "./components";

const ToggleButton = styled.button(({ active, isDark }) => ({
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
    backgroundColor: "rgb(2 127 254 / 24%)",
  }),
  ...(isDark &&
    active && {
      backgroundColor: "rgb(11 46 82 / 18%)",
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
  return (
    <Group key={TOOL_ID}>
      <ToggleButton
        title="Light mode"
        active={muiMode === "light"}
        onClick={turnLight}
      >
        <SvgMuiLight height="20" />
      </ToggleButton>
      <ToggleButton
        title="Dark mode"
        isDark
        active={muiMode === "dark"}
        onClick={turnDark}
      >
        <SvgMuiDark height="20" />
      </ToggleButton>
    </Group>
  );
};

export const FontTool = () => {
  const [{ googleFont, googleFontSecondary }, updateGlobals] = useGlobals();
  const parameters = useParameter() || {};

  const selectFont = (result) => {
    updateGlobals({
      googleFont: result ? result.value : undefined,
    });
  };
  const selectSecondaryFont = (result) => {
    updateGlobals({
      googleFontSecondary: result ? result.value : undefined,
    });
  };

  useEffect(() => {
    if (parameters.googleFont) {
      selectFont({ value: parameters.googleFont });
    }
  }, [parameters.googleFont]);

  useEffect(() => {
    selectSecondaryFont({ value: parameters.googleFontSecondary });
  }, [parameters.googleFontSecondary]);

  return (
    <Group>
      <GoogleFontSelect
        isClearable
        {...(googleFont && {
          value: { label: googleFont, value: googleFont, family: googleFont },
        })}
        getOptionValue={({ family }) => family}
        onChange={selectFont}
        apiKey={process.env.GOOGLE_FONT_API_KEY}
      />
      {googleFontSecondary && (
        <GoogleFontSelect
          {...(googleFontSecondary && {
            value: {
              label: googleFontSecondary,
              value: googleFontSecondary,
              family: googleFontSecondary,
            },
          })}
          minWidth={140}
          getOptionValue={({ family }) => family}
          onChange={selectSecondaryFont}
          apiKey={process.env.GOOGLE_FONT_API_KEY}
        />
      )}
    </Group>
  );
};
