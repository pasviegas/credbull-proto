'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useTransition } from 'react';
import { SiweMessage, generateNonce } from 'siwe';
import { useAccount, useSignMessage } from 'wagmi';

import { linkWallet } from '@/app/(protected)/dashboard/link-wallet.action';

export function LinkWallet() {
  const { signMessageAsync } = useSignMessage();
  const [isPending, startTransition] = useTransition();

  useAccount({
    onConnect: async ({ address, connector, isReconnected }) => {
      if (isReconnected) return;

      const preMessage = new SiweMessage({
        domain: window.location.host,
        address,
        statement: 'By connecting your wallet, you agree to the Terms of Service and Privacy Policy.',
        uri: window.location.origin,
        version: '1',
        chainId: await connector?.getChainId(),
        nonce: generateNonce(),
      });

      const message = preMessage.prepareMessage();
      const signature = await signMessageAsync({ message });
      startTransition(() => linkWallet(message, signature));
    },
  });

  return isPending ? <>Linking...</> : <ConnectButton />;
}
