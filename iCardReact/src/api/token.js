import { TOKEN } from "../util/constants";

//Guardando el token en el almacenamiento local
export function setToken(token) {
  localStorage.setItem(TOKEN, token);
}

//omar el token desde el almacenamiento local
export function getToken() {
  return localStorage.getItem(TOKEN);
}

//Borrar el token desde el almacenamiento local
export function removeToken() {
  localStorage.removeItem(TOKEN);
}
