import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
  PropsWithChildren,
} from "react";

import { User } from "@/lib/interfaces/User";

type AuthContext = {
  authToken?: string | null;
  currentUser?: User | null;
  handleLogin: () => Promise<void>;
  handleLogout: () => Promise<void>;
};

const _AuthContext = createContext<AuthContext | undefined>(undefined);

export const useAuth = () => {
  const authContext = useContext(_AuthContext);

  if (!authContext) {
    throw new Error("useAuth must be used within a AuthProvider");
  }

  return authContext;
};

type AuthProviderProps = PropsWithChildren;

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authToken, setAuthToken] = useState<string | null>();
  const [currentUser, setCurrentUser] = useState<User | null>();

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await getUser();

        const { authToken, user } = response[1];

        setAuthToken(authToken);
        setCurrentUser(user);
      } catch {
        setAuthToken(null);
        setCurrentUser(null);
      }
    }
  }, []);
};
