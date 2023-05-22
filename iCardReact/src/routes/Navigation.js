import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import routes from "./routes";
import { map } from "lodash";

export const Navigation = () => {
  console.log("Rutas---> ", routes);
  return (
    /**BrowserRouter: Toda la navegacion tiene que estar aqui */
    /**Routes: cuando encuentre la ruta no siga buscando */
    <BrowserRouter>
      <Routes>
        {map(routes, (route, index) => (
          <Route
            key={{ index }}
            path={route.path}
            element={
              <route.layout>
                <route.component />
              </route.layout>
            }
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
};
