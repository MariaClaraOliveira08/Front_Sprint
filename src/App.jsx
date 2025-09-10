import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Home from "./pages/Home";
import Perfil from "./pages/Perfil";
import SobreNos from "./pages/SobreNos";
import ProtectedRoute from "./components/ProtectedRoute";
import Inicio from "./pages/Inicio";
import Favoritos from "./pages/Favoritos";
import Avaliacao from "./pages/Avaliacao";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas que usam o Layout padrão */}
        <Route element={<Layout />}>
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/home" element={<Home />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/sobre" element={<SobreNos />} />
          <Route path="/favoritos" element={<Favoritos />} />
          <Route path="/avaliacao" element={<Avaliacao />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
