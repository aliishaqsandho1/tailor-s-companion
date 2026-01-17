import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { api } from '@/utils/api';
import { toast } from 'sonner';

const AUTH_KEY = 'tailor_master_auth';
const SESSION_EXPIRY_KEY = 'tailor_master_session_expiry';
const SESSION_DURATION = 24 * 60 * 60 * 1000;

interface AuthContextType {
  isAuthenticated: boolean | null;
  hasPin: boolean | null;
  isLoading: boolean;
  setPin: (pin: string) => Promise<boolean>;
  verifyPin: (pin: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface Props {
  children: ReactNode;
}

export function AuthContextProvider({ children }: Props) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [hasPin, setHasPin] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const expiryStr = localStorage.getItem(SESSION_EXPIRY_KEY);
      const authStatus = localStorage.getItem(AUTH_KEY);

      if (expiryStr && authStatus === 'true') {
        const expiry = parseInt(expiryStr, 10);
        if (Date.now() > expiry) {
          localStorage.removeItem(AUTH_KEY);
          localStorage.removeItem(SESSION_EXPIRY_KEY);
        }
      }

      const data = await api.post('pin', { action: 'check_exists' });
      const pinExists = data?.exists ?? false;
      const sessionValid = localStorage.getItem(AUTH_KEY) === 'true';

      setHasPin(pinExists);
      setIsAuthenticated(sessionValid && pinExists);
    } catch (error) {
      console.error('Auth check error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const setPin = async (_pin: string): Promise<boolean> => {
    toast.error('پن کوڈ صرف ڈیٹا بیس سے تبدیل کیا جا سکتا ہے');
    return false;
  };

  const verifyPin = async (pin: string): Promise<boolean> => {
    try {
      const pinRegex = /^\d{4,6}$/;
      if (!pinRegex.test(pin)) {
        toast.error('غلط پن کوڈ');
        return false;
      }

      const data = await api.post('pin', { action: 'verify', pin });

      if (data?.success) {
        const expiry = Date.now() + SESSION_DURATION;
        localStorage.setItem(AUTH_KEY, 'true');
        localStorage.setItem(SESSION_EXPIRY_KEY, expiry.toString());

        setIsAuthenticated(true);
        toast.success('خوش آمدید!');
        return true;
      } else {
        toast.error('غلط پن کوڈ');
        return false;
      }
    } catch (error) {
      console.error('Error verifying PIN:', error);
      toast.error('پن کوڈ چیک کرنے میں مسئلہ ہوا');
      return false;
    }
  };

  const logout = (): void => {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(SESSION_EXPIRY_KEY);
    setIsAuthenticated(false);
    toast.success('لاگ آؤٹ ہو گیا');
  };

  const value: AuthContextType = {
    isAuthenticated,
    hasPin,
    isLoading,
    setPin,
    verifyPin,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthContextProvider');
  }
  return context;
}
