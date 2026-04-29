import { Lexend } from 'next/font/google';
import './globals.css';

const lexend = Lexend({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const metadata = {
  title: 'Passion Fort',
  description: 'Passion Fort Receipt Generator',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${lexend.className} bg-gray-50 transition-all duration-100`}>{children}</body>
    </html>
  );
}
