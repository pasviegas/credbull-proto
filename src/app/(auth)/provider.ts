import { supabase } from '@/clients/supabase.client';
import { AuthBindings } from '@refinedev/core';

export const provider: AuthBindings = {
  login: async ({ email, password, providerName }) => {
    if (providerName) {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: providerName,
        options: {
          redirectTo: `${origin}/code/callback`,
        },
      });

      if (error) return { success: false, error };
      if (data?.url) return { success: true, redirectTo: data?.url };
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) return { success: false, error };
    if (data?.session) return { success: true, redirectTo: '/dashboard' };

    return {
      success: false,
      error: {
        name: 'LoginError',
        message: 'Invalid username or password',
      },
    };
  },
  forgotPassword: async ({ email }) => {
    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/update-password`,
      });

      if (error) return { success: false, error };
      if (data) return { success: true };
    } catch (error: any) {
      return { success: false, error };
    }

    return {
      success: false,
      error: {
        message: 'Forgot password failed',
        name: 'Invalid email',
      },
    };
  },
  updatePassword: async ({ password }) => {
    try {
      const { data, error } = await supabase.auth.updateUser({ password });

      if (error) return { success: false, error };
      if (data) return { success: true, redirectTo: '/dashboard' };
    } catch (error: any) {
      return { success: false, error };
    }
    return {
      success: false,
      error: {
        message: 'Update password failed',
        name: 'Invalid password',
      },
    };
  },
  logout: async () => {
    const { error } = await supabase.auth.signOut();

    if (error) return { success: false, error };

    return { success: true, redirectTo: '/' };
  },
  register: async ({ email, password }) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/code/callback`,
        },
      });

      if (error) return { success: false, error };
      if (data) return { success: true, redirectTo: '/login' };
    } catch (error: any) {
      return { success: false, error };
    }

    return {
      success: false,
      error: {
        message: 'Register failed',
        name: 'Invalid email or password',
      },
    };
  },
  check: async (ctx) => {
    const { data } = await supabase.auth.getUser();

    if (data.user) return { authenticated: true };

    return { authenticated: false, redirectTo: '/login' };
  },
  getPermissions: async () => {
    const user = await supabase.auth.getUser();

    if (user) return user.data.user?.role;

    return null;
  },
  getIdentity: async () => {
    const { data } = await supabase.auth.getUser();

    if (data?.user) return { ...data.user, name: data.user.email };

    return null;
  },
  onError: async (error) => {
    console.error(error);
    return { error };
  },
};
