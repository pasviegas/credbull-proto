'use client';

import { ReactNode } from 'react';

import { provider } from '@/app/(auth)/provider';
import { supabase } from '@/clients/supabase.client';
import { NotificationsProvider } from '@mantine/notifications';
import { Refine } from '@refinedev/core';
import { notificationProvider } from '@refinedev/mantine';
import routerProvider from '@refinedev/nextjs-router/app';
import { dataProvider } from '@refinedev/supabase';

export default function RefineProvider({ children }: { children: ReactNode }) {
  return (
    <>
      <NotificationsProvider position="top-right" />
      <Refine
        notificationProvider={notificationProvider}
        dataProvider={dataProvider(supabase)}
        routerProvider={routerProvider}
        authProvider={provider}
        resources={[]}
        options={{ syncWithLocation: true }}
      >
        {children}
      </Refine>
    </>
  );
}
