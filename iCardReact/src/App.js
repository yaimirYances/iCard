import React from "react";
import { ToastContainer } from "react-toastify";
import { Navigation } from "./routes";
import { AuthProvider } from "./context/AuthContext";

export default function App() {
  return (
    <div>
      {/* Llamando al contexto*/}
      <AuthProvider>
      <Navigation />
      {/* programando tarea */}
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
      />
      </AuthProvider>

    </div>
  );
}
