"use client";

import { ReactNode, useMemo, useState } from "react";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  PaletteMode,
} from "@mui/material";
import { ColorModeContext } from "./ColorModeContext";

export function ThemeRegistry({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<PaletteMode>("light");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prev) => (prev === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,

          background:
            mode === "light"
              ? {
                  default: "#f6f7f8",
                  paper: "#ffffff",
                }
              : {
                  default: "#121212",
                  paper: "#1e1e1e",
                },
        },

        shape: {
          borderRadius: 8,
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
