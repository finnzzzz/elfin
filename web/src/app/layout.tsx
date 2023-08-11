import React from 'react';
import './globals.css';
import { Nunito_Sans } from 'next/font/google';
import Sidebar from '@/components/sidebar/Sidebar';
import AuthProvider from '@/components/auth/AuthProvider';

const font = Nunito_Sans({ subsets: ['latin'] });

export const metadata = {
  title: 'elfin',
  description: 'A browser automation tool',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={`${font.className} flex flex-col bg-white md:flex-row`}>
        <AuthProvider />
        <Sidebar />
        <div className='mt-[60px] w-full md:ml-[64px] md:mt-0'>{children}</div>
      </body>
    </html>
  );
}
