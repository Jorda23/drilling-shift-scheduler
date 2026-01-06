"use client";

import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  useTheme,
  Menu,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";

import DownloadIcon from "@mui/icons-material/Download";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

import { useColorMode } from "theme/ColorModeContext";
import { exportScheduleToExcel } from "utils/exportExcel";
import { exportScheduleToPdf } from "utils/exportPdf";
import { exportScheduleToWord } from "utils/exportWord";
import { Supervisor } from "engine/types";
import { GradientButton } from "components/GradientButton";

export function Navbar({ schedule }: { schedule: Supervisor[] }) {
  const theme = useTheme();
  const { toggleColorMode } = useColorMode();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleExport = (type: "pdf" | "excel" | "word") => {
    handleClose();

    if (!schedule || schedule.length === 0) {
      setSnackbarOpen(true);
      return;
    }

    switch (type) {
      case "pdf":
        exportScheduleToPdf(schedule);
        break;
      case "excel":
        exportScheduleToExcel(schedule);
        break;
      case "word":
        exportScheduleToWord(schedule);
        break;
    }
  };

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          boxShadow:
            theme.palette.mode === "dark"
              ? "0 2px 8px rgba(0,0,0,0.6)"
              : "0 2px 12px rgba(0,0,0,0.08)",
          backgroundColor:
            theme.palette.mode === "dark"
              ? "rgba(30,30,30,0.85)"
              : "rgba(255,255,255,0.85)",
        }}
        color="default"
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" fontWeight={700}>
            Planificador de Perforación
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton onClick={toggleColorMode}>
              {theme.palette.mode === "dark" ? (
                <LightModeIcon />
              ) : (
                <DarkModeIcon />
              )}
            </IconButton>

            <GradientButton
              onClick={handleMenuOpen}
              startIcon={<DownloadIcon />}
            >
              Exportar
            </GradientButton>

            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
              <MenuItem onClick={() => handleExport("pdf")}>PDF</MenuItem>
              <MenuItem onClick={() => handleExport("excel")}>Excel</MenuItem>
              <MenuItem onClick={() => handleExport("word")}>Word</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="warning"
          variant="filled"
        >
          No hay cronograma para exportar
        </Alert>
      </Snackbar>
    </>
  );
}
