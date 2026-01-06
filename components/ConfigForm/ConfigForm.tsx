"use client";

import { JSX, useState } from "react";
import { Card, CardContent, Box, TextField, useTheme } from "@mui/material";
import { GradientButton } from "components/GradientButton";

export interface ConfigFormProps {
  onCalculate: (config: {
    workDays: number;
    restDays: number;
    inductionDays: number;
    totalDays: number;
  }) => void;
}

export function ConfigForm({ onCalculate }: ConfigFormProps): JSX.Element {
  const theme = useTheme();
  const [form, setForm] = useState({
    workDays: "",
    restDays: "",
    inductionDays: "",
    totalDays: "",
  });

  const handleChange =
    (field: keyof typeof form) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setForm({
        ...form,
        [field]: event.target.value,
      });
    };

  const isValid =
    form.workDays && form.restDays && form.inductionDays && form.totalDays;

  const handleSubmit = () => {
    onCalculate({
      workDays: Number(form.workDays),
      restDays: Number(form.restDays),
      inductionDays: Number(form.inductionDays),
      totalDays: Number(form.totalDays),
    });
  };

  return (
    <Card
      sx={{
        mb: 3,
        backdropFilter: "blur(8px)",
        boxShadow:
          theme.palette.mode === "dark"
            ? "0 2px 8px rgba(0,0,0,0.6)"
            : "0 2px 12px rgba(0,0,0,0.08)",
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            alignItems: "center",
          }}
        >
          <TextField
            label="Días trabajo (N)"
            type="number"
            value={form.workDays}
            onChange={handleChange("workDays")}
            fullWidth
            sx={{ flex: "1 1 200px" }}
          />

          <TextField
            label="Días descanso (M)"
            type="number"
            value={form.restDays}
            onChange={handleChange("restDays")}
            fullWidth
            sx={{ flex: "1 1 200px" }}
          />

          <TextField
            label="Días inducción"
            type="number"
            value={form.inductionDays}
            onChange={handleChange("inductionDays")}
            fullWidth
            sx={{ flex: "1 1 200px" }}
          />

          <TextField
            label="Total días perforación"
            type="number"
            value={form.totalDays}
            onChange={handleChange("totalDays")}
            fullWidth
            sx={{ flex: "1 1 200px" }}
          />

          <GradientButton
            onClick={handleSubmit}
            disabled={!isValid}
            fullWidth
            sx={{ flex: "1 1 200px" }}
          >
            Calcular Cronograma
          </GradientButton>
        </Box>
      </CardContent>
    </Card>
  );
}
