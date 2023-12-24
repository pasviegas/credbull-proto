import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import UpdatePasswordForm from '@/app/(auth)/update-password/form';
import { createClient } from '@/clients/supabase.server';

export default async function UpdatePassword({ searchParams }: { searchParams: { code?: string } }) {
  if (!searchParams.code) return redirect('/login');

  const supabase = createClient(cookies());
  const { data } = await supabase.auth.exchangeCodeForSession(searchParams.code);

  return (
    <UpdatePasswordForm
      access_token={data.session?.access_token ?? ''}
      refresh_token={data.session?.refresh_token ?? ''}
    />
  );
}
