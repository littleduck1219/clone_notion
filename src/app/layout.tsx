import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Notion',
    description: 'Notion is the connected workspace where better, faster work happens.',
    icons: {
        icon: [
            {
                media: '(prefers-color-schema: light)',
                url: '/logo.svg',
                href: '/logo.svg',
            },
            {
                media: '(prefers-color-schema: dark)',
                url: '/logo-dark.svg',
                href: '/logo-dark.svg',
            },
        ],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>{children}</body>
        </html>
    );
}
