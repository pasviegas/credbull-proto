'use client';

import { AuthPage } from '@refinedev/mantine';

export default function SignInForm() {
  return (
    <AuthPage
      type="login"
      title="Credbull DeFI"
      providers={[
        { name: 'discord', label: 'Discord' },
        { name: 'twitter', label: 'Twitter' },
      ]}
      rememberMe={false}
    />
  );
}
