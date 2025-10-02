'use client';
import ErrorState from '@/app/components/ErrorState';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  console.error(error);
  return <ErrorState title="Algo salió mal" onRetry={reset} />;
}