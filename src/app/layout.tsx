import "./globals.css";

export const metadata = {
  title: "Pomodoro Timer",
  description: "Timer baseado na metodologia de Pomodoro",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
