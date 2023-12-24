'use client';

import { useServerInsertedHTML } from 'next/navigation';
import { ReactNode } from 'react';

import { CacheProvider } from '@emotion/react';
import { MantineProvider, createEmotionCache } from '@mantine/core';

const cache = createEmotionCache({ key: 'my' });
cache.compat = true;

export default function StyleProvider({ children }: { children: ReactNode }) {
  useServerInsertedHTML(() => (
    <style
      data-emotion={`${cache.key} ${Object.keys(cache.inserted).join(' ')}`}
      dangerouslySetInnerHTML={{
        __html: Object.values(cache.inserted).join(' '),
      }}
    />
  ));

  return (
    <CacheProvider value={cache}>
      <MantineProvider withGlobalStyles withNormalizeCSS emotionCache={cache}>
        {children}
      </MantineProvider>
    </CacheProvider>
  );
}
