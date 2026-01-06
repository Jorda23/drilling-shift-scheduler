import { JSX } from "react";
import { Card, CardContent, Box, TextField, Button } from "@mui/material";

export interface ConfigFormProps {
  onCalculate: () => void;
}

export function ConfigForm({ onCalculate }: ConfigFormProps): JSX.Element {
  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Box sx={{ flex: "1 1 220px" }}>
            <TextField label="Días trabajo (N)" fullWidth type="number" />
          </Box>

          <Box sx={{ flex: "1 1 220px" }}>
            <TextField label="Días descanso (M)" fullWidth type="number" />
          </Box>

          <Box sx={{ flex: "1 1 220px" }}>
            <TextField label="Días inducción" fullWidth type="number" />
          </Box>

          <Box sx={{ flex: "1 1 220px" }}>
            <TextField label="Total días perforación" fullWidth type="number" />
          </Box>

          <Box sx={{ width: "100%" }}>
            <Button variant="contained" onClick={onCalculate} fullWidth>
              Calcular Cronograma
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
