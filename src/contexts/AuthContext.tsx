import { createContext, useState, useEffect } from "react";


interface AuthContextType {
  isAuthenticated: boolean;
  id: string | null;
  setIsAuthenticated: (value: boolean, id: string | null) => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  id: null,
  setIsAuthenticated: (value: boolean, id: string | null) => {},
});

export const AuthProvider = (props: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [id, setid] = useState<string | null>(null);

  // Tarayıcı yerel depolama kullanarak oturum durumunu sakla ve sayfa yenilendiğinde kontrol et
  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    const storedid = localStorage.getItem('id');
    if (storedAuth) {
      setIsAuthenticated(JSON.parse(storedAuth));
      setid(storedid);
    }
  }, []);

  const handleSetIsAuthenticated = (value: boolean, id: string | null) => {
    setIsAuthenticated(value);
    setid(id);
    // Tarayıcı yerel depolama kullanarak oturum durumunu sakla
    localStorage.setItem('isAuthenticated', JSON.stringify(value));
    localStorage.setItem('id', id || ''); 
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, id, setIsAuthenticated: handleSetIsAuthenticated }}>
      {props.children}
    </AuthContext.Provider>
  );
};
