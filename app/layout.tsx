import { CssBaseline, Container } from "@mui/material";
import { Navbar } from "components/Navbar";
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
        <Navbar />

        <Container maxWidth="xl" sx={{ mt: 4 }}>
          {children}
        </Container>
                        </ThemeRegistry>

      </body>
    </html>
  );
}
