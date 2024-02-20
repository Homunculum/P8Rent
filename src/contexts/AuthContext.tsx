import { createContext, useState, useEffect } from "react";


interface AuthContextType {
  isAuthenticated: boolean;
  userId: string | null;
  setIsAuthenticated: (value: boolean, id: string | null) => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  userId: null,
  setIsAuthenticated: (value: boolean, id: string | null) => {},
});

export const AuthProvider = (props: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  // Tarayıcı yerel depolama kullanarak oturum durumunu sakla ve sayfa yenilendiğinde kontrol et
  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    const storedUserId = localStorage.getItem('userId');
    if (storedAuth) {
      setIsAuthenticated(JSON.parse(storedAuth));
      setUserId(storedUserId);
    }
  }, []);

  const handleSetIsAuthenticated = (value: boolean, id: string | null) => {
    setIsAuthenticated(value);
    setUserId(id);
    // Tarayıcı yerel depolama kullanarak oturum durumunu sakla
    localStorage.setItem('isAuthenticated', JSON.stringify(value));
    localStorage.setItem('userId', id || ''); 
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userId, setIsAuthenticated: handleSetIsAuthenticated }}>
      {props.children}
    </AuthContext.Provider>
  );
};
