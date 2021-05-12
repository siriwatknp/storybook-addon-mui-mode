import { useCallback } from "react";
import { useGlobals } from "@storybook/api";

export function useMuiMode() {
  const [{ muiMode = "light" }, updateGlobals] = useGlobals();

  const toggleMode = useCallback(
    (value) =>
      updateGlobals({
        muiMode: value,
      }),
    [muiMode]
  );

  return {
    muiMode,
    turnDark: () => toggleMode("dark"),
    turnLight: () => toggleMode("light"),
  };
}
