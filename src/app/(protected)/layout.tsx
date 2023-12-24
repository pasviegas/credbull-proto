import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

import { createClient } from '@/clients/supabase.server';

export default async function ProtectedLayout(props: { children: ReactNode }) {
  const supabase = createClient(cookies());
  const { data: auth } = await supabase.auth.getUser();

  if (!auth.user) redirect('/login');

  return <>{props.children}</>;
}
