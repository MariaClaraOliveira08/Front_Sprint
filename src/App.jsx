import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Inicio from "./pages/Inicio";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Home from "./pages/Home";
import Perfil from "./pages/Perfil";
import SobreNos from "./pages/SobreNos";
import Favoritos from "./pages/Favoritos";
import AvaliacoesUsuario from "./pages/Avaliacao";
import ProtectedRoute from "./components/ProtectedRoute";
import Mapa from "./pages/Mapa";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Inicio/>} />
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
            path="/mapa"
            element={
              <ProtectedRoute>
                <Mapa />
              </ProtectedRoute>
            }
          />

          <Route
            path="/sobre"
            element={
                <SobreNos />
            }
          />
          
          <Route
            path="/favoritos"
            element={
              <ProtectedRoute>
                <Favoritos />
              </ProtectedRoute>
            }
          />
          <Route
            path="/avaliacao"
            element={
              <ProtectedRoute>
                <AvaliacoesUsuario />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;