import type { Metadata } from 'next';
import './globals.css';
import CustomCursor from '@/components/CustomCursor';

export const metadata: Metadata = {
  title: 'BHAVYA — AI Systems Lab & Spatial Command Center',
  description: 'Bhavya Porwal — AI/ML Engineer. Building intelligent systems, real-time AI, and simulation.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#080808] text-[#f0ede8] font-sans selection:bg-[#c8f135] selection:text-[#080808] overflow-x-hidden cursor-none">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
