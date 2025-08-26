import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Home from "./pages/Home";
import Perfil from "./pages/Perfil";
import SobreNos from "./pages/SobreNos";
import ProtectedRoute from "./components/ProtectedRoute"; // 👈 corrigido



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/home" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />

          <Route path="/perfil" element={
            <ProtectedRoute>
              <Perfil />
            </ProtectedRoute>} />
          <Route path="/sobre" element={
            <ProtectedRoute>
              <SobreNos />
            </ProtectedRoute>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
