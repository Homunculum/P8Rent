import { createContext, useState, useEffect } from "react";


interface AuthContextType {
  isAuthenticated: boolean;
  id: string | null;
  filterStartDate: string | null;
  filterEndDate: string | null;
  setIsAuthenticated: (value: boolean, id: string | null) => void;
  setFilterDates: (startDate: string | null, endDate: string | null) => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  id: null,
  filterStartDate: null,
  filterEndDate: null,
  setIsAuthenticated: (value: boolean, id: string | null) => {},
  setFilterDates: (startDate: string | null, endDate: string | null) => {},
});


export const AuthProvider = (props: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [id, setid] = useState<string | null>(null);
  const [filterStartDate, setFilterStartDate] = useState<string | null>(null);
  const [filterEndDate, setFilterEndDate] = useState<string | null>(null);

  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    const storedid = localStorage.getItem('id');
    const storedStartDate = localStorage.getItem('filterStartDate');
    const storedEndDate = localStorage.getItem('filterEndDate');
    if (storedAuth) {
      setIsAuthenticated(JSON.parse(storedAuth));
      setid(storedid);
      setFilterStartDate(storedStartDate);
      setFilterEndDate(storedEndDate);
    }
  }, []);

  const handleSetIsAuthenticated = (value: boolean, id: string | null) => {
    setIsAuthenticated(value);
    setid(id);
    localStorage.setItem('isAuthenticated', JSON.stringify(value));
    localStorage.setItem('id', id || ''); 
  };

  const handleSetFilterDates = (startDate: string | null, endDate: string | null) => {
    setFilterStartDate(startDate);
    setFilterEndDate(endDate);
    localStorage.setItem('filterStartDate', startDate || '');
    localStorage.setItem('filterEndDate', endDate || '');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, id, filterStartDate, filterEndDate, setIsAuthenticated: handleSetIsAuthenticated, setFilterDates: handleSetFilterDates }}>
      {props.children}
    </AuthContext.Provider>
  );
};

