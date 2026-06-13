import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  name: string;
  email: string;
  initials: string;
  role: string;
  career: string;
  campus: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

// 🔄 AQUÍ es donde en el futuro reemplazas con supabase.auth.getUser()
function getUserFromEmail(email: string): User {
  const namePart = email.split("@")[0];
  const parts = namePart.split(".");
  const name = parts.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(" ");
  const initials = parts.map(p => p.charAt(0).toUpperCase()).join("").slice(0, 2);
  return {
    name,
    email,
    initials,
    role: "Estudiante",
    career: "Ingeniería Civil Informática",
    campus: "Campus - San Joaquin",
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string) => setUser(getUserFromEmail(email));
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return ctx;
}