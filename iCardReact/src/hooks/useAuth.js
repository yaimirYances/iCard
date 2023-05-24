import { useContext } from "react";
import { AuthContext } from "../context";

//Usando el contexto creado
export const useAuth = () => useContext(AuthContext);
