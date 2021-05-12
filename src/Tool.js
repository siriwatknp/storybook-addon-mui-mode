import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { useSharedState } from "@storybook/api";
import { TOOL_ID } from "./constants";
import { SvgMuiDark } from "./components/SvgMuiDark";
import { SvgMuiLight } from "./components/SvgMuiLight";
import { useMuiMode } from "./useMuiMode";

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

export const Tool = () => {
  const { muiMode, turnDark, turnLight } = useMuiMode();
  const state = useSharedState();
  console.log(state);

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
