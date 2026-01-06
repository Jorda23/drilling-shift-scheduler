import { CssBaseline } from "@mui/material";
import { ThemeRegistry } from "theme/ThemeRegistry";

export const metadata = {
  title: "Drilling Shift Scheduler",
  description: "Mining supervisor scheduling engine",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <CssBaseline />

          {children}
        </ThemeRegistry>
      </body>
    </html>
  );
}
