import { CssBaseline, Container } from '@mui/material';

export const metadata = {
  title: 'Drilling Shift Scheduler',
  description: 'Mining supervisor scheduling engine',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CssBaseline />
        <Container maxWidth="xl" sx={{ mt: 4 }}>
          {children}
        </Container>
      </body>
    </html>
  );
}
