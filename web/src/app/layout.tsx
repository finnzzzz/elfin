import React from 'react';
import './globals.css';
import { Nunito_Sans } from 'next/font/google';
import Sidebar from './components/sidebar/Sidebar';
import AuthProvider from './components/auth/AuthProvider';

const font = Nunito_Sans({ subsets: ['latin'] });

export const metadata = {
  title: 'elfin',
  description: 'A browser automation tool',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={font.className}>
        <AuthProvider />
        <Sidebar />
        <div className=' ml-[64px] w-full'>{children}</div>
      </body>
    </html>
  );
}
