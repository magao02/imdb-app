import type { AppProps } from 'next/app';

import { NextUIProvider } from '@nextui-org/system';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { useRouter } from 'next/router';

import { AuthProvider } from '@/providers/auth-provider';
import { fontSans, fontMono } from '@/config/fonts';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <NextUIProvider navigate={router.push}>
      <NextThemesProvider>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </NextThemesProvider>
    </NextUIProvider>
  );
}

export const fonts = {
  sans: fontSans.style.fontFamily,
  mono: fontMono.style.fontFamily,
};
