import './global.css';

export const metadata = {
  title: 'Bills - Jason Ruesch',
  description: 'Track monthly and yearly bills',
};

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
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
