import { AccountStatusDto } from '@credbull/api';
import { SupabaseClient } from '@supabase/supabase-js';

const authHeaders = async (supabase: SupabaseClient) => {
  const { data } = await supabase.auth.getSession();

  return { headers: { Authorization: `Bearer ${data.session!.access_token}` } };
};

export const createClient = (supabase: SupabaseClient) => {
  return {
    accountStatus: async (): Promise<AccountStatusDto> => {
      const headers = await authHeaders(supabase);

      return fetch(`${process.env.API_BASE_URL}/accounts/status`, headers).then((res) => res.json());
    },
  };
};
