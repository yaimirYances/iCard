import React, { createContext, useEffect, useState } from "react";
import { getToken, removeToken, setToken } from "../api/token";
import { useUser } from "../hooks";

export const AuthContext = createContext({
  auth: undefined,
  login: () => null,
  logout: () => null,
});

export function AuthProvider(props) {
  const { children } = props;
  const [auth, setAuth] = useState(undefined);
  const { getMe } = useUser();

  useEffect(() => {
    (async () => {
      const token = getToken();
      if (token) {
        const me = await getMe(token);
        setAuth({ token, me });
      } else {
        setAuth(null);
      }
    })();
  }, []);

  //Agregando de sesion valores a un estado
  const login = async (token) => {
    setToken(token);
    const me = await getMe(token);
    setAuth({ token, me });
  };

  //Cerrando sesion
  const logout = () => {
    if (auth) {
      removeToken();
      setAuth(null);
    }
  };

  const valueContext = {
    auth,
    login,
    logout,
  };

  //Quitar el problema al recargar la pagina
  if (auth === undefined) return null;

  return (
    <AuthContext.Provider value={valueContext}>{children}</AuthContext.Provider>
  );
}
