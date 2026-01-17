import { ReactNode } from 'react';
import { useAuth, AuthContextProvider } from '@/hooks/useAuth';
import { PinScreen } from './PinScreen';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

interface AuthProviderProps {
  children: ReactNode;
}

function AuthGate({ children }: { children: ReactNode }) {
  const { isAuthenticated, hasPin, isLoading, setPin, verifyPin } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  // No PIN set yet - show setup screen
  if (!hasPin) {
    return <PinScreen mode="setup" onSubmit={setPin} />;
  }

  // Not authenticated - show login screen
  if (!isAuthenticated) {
    return <PinScreen mode="login" onSubmit={verifyPin} />;
  }

  // Authenticated - show app
  return <>{children}</>;
}

export function AuthProvider({ children }: AuthProviderProps) {
  return (
    <AuthContextProvider>
      <AuthGate>{children}</AuthGate>
    </AuthContextProvider>
  );
}
