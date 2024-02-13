import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext({ isAuthenticated: false, setIsAuthenticated: (value: boolean) => {} });

export const AuthProvider = (props: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Tarayıcı yerel depolama kullanarak oturum durumunu sakla ve sayfa yenilendiğinde kontrol et
  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    if (storedAuth) {
      setIsAuthenticated(JSON.parse(storedAuth));
    }
  }, []);

  const handleSetIsAuthenticated = (value: boolean) => {
    setIsAuthenticated(value);
    // Tarayıcı yerel depolama kullanarak oturum durumunu sakla
    localStorage.setItem('isAuthenticated', JSON.stringify(value));
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated: handleSetIsAuthenticated }}>
      {props.children}
    </AuthContext.Provider>
  );
};
