'use client';

import { useEffect } from 'react';

import { supabase } from '@/clients/supabase.client';
import { AuthPage } from '@refinedev/mantine';

export default function UpdatePasswordForm(props: { access_token: string; refresh_token: string }) {
  useEffect(() => {
    supabase.auth.setSession(props).then();
  }, [props]);

  return <AuthPage title="Credbull DeFI" type="updatePassword" />;
}
