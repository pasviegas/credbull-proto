import { cookies } from 'next/headers';

import { createClient } from '@/clients/supabase.server';

import { accountStatus } from '@/app/(protected)/dashboard/account-status.action';

export default async function Dashboard() {
  const supabase = createClient(cookies());
  const { data: auth } = await supabase.auth.getSession();

  const account = await accountStatus();

  return (
    <div>
      Hey, {auth.session?.user?.email}! You are {account.status}. Your REFRESH TOKEN is {auth.session?.refresh_token}.
    </div>
  );
}
