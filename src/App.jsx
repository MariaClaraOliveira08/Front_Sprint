import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Inicio from "./pages/Inicio";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Home from "./pages/Home";
import Perfil from "./pages/Perfil";
import SobreNos from "./pages/SobreNos";
import Favoritos from "./pages/Favoritos";
import Avaliacao from "./pages/Avaliacao";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/home" element={<Home />} />

          <Route
            path="/perfil"
            element={
              <ProtectedRoute>
                <Perfil />
              </ProtectedRoute>
            }
          />
          <Route
            path="/sobre"
            element={
              <ProtectedRoute>
                <SobreNos />
              </ProtectedRoute>
            }
          />
          <Route
            path="/favoritos"
            element={
              
                <Favoritos />
              
            }
          />
          <Route
            path="/avaliacao"
            element={
              <ProtectedRoute>
                <Avaliacao />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
