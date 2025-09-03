  import React, { useEffect, useState } from "react";
  import { Box, TextField, Button, Avatar } from "@mui/material";
  import EditIcon from "@mui/icons-material/Edit";
  import ExitToAppIcon from "@mui/icons-material/ExitToApp";
  import api from "../axios/axios";
  import { useNavigate } from "react-router-dom";

  function Perfil() {
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");

    const [user, setUser] = useState({
      id: "",
      name: "",
      email: "",
      password: "",
    });

    const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("authenticated");

    // redireciona e substitui a rota atual
    navigate("/login", { replace: true });
  };


    // Carregar dados do usuário
    useEffect(() => {
      async function fetchUsuario() {
        try {
          if (!userId) return;
          const response = await api.get(`/user/${userId}`);
          const userData = response.data.user;

          setUser({
            id: userId,
            name: userData.name || "",
            email: userData.email || "",
            password: "******",
          });
        } catch (error) {
          console.error("Erro ao carregar dados do usuário:", error);
        }
      }
      fetchUsuario();
    }, [userId]);

    // Atualizar dados do usuário
    const handleUpdate = async () => {
      try {
        const response = await api.updateUser(user.id, {
          name: user.name,
          email: user.email,
          password: user.password,
        });
        alert(response.data.message);
      } catch (error) {
        console.error("Erro ao atualizar os dados:", error);
        alert("Erro ao atualizar os dados do usuário.");
      }
    };

    // Deletar conta
    const handleDelete = async () => {
      const confirmDelete = window.confirm(
        "Você tem certeza que deseja excluir sua conta?"
      );
      if (!confirmDelete) return;

      try {
        const response = await api.deleteUser(user.id);
        alert(response.data.message);
        navigate("/");
      } catch (error) {
        console.error("Erro ao excluir o usuário:", error);
        alert("Erro ao excluir o usuário.");
      }
    };

    const onChange = (event) => {
      const { name, value } = event.target;
      setUser({ ...user, [name]: value });
    };

    return (
      <Box
        sx={{
          width: "100%",
          minHeight: "100vh",
          backgroundColor: "#E0E0E0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pt: 5,
          boxSizing: "border-box",
        }}
      >
        {/* Cabeçalho */}
        <Box
          sx={{
            width: "100%",
            height: 150,
            background: "#7681A1",
            position: "relative",
          }}
        >
          <Avatar
            src="/path/to/your/image.jpg"
            alt="Foto do perfil"
            sx={{
              width: 120,
              height: 120,
              position: "absolute",
              bottom: -60,
              left: "50%",
              transform: "translateX(-50%)",
              border: "4px solid white",
            }}
          />
        </Box>

        {/* Formulário */}
        <Box
          sx={{
            width: "100%",
            maxWidth: 400,
            mt: 8,
            display: "flex",
            flexDirection: "column",
            gap: 3,
            alignItems: "center",
          }}
        >
          <TextField
            label="Nome"
            name="name"
            value={user.name}
            onChange={onChange}
            variant="outlined"
            fullWidth
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={user.email}
            onChange={onChange}
            variant="outlined"
            fullWidth
          />
          <TextField
            label="Senha"
            name="password"
            type="password"
            value={user.password}
            onChange={onChange}
            variant="outlined"
            fullWidth
          />

          {/* Botões Editar e Sair lado a lado */}
          <Box sx={{ display: "flex", gap: 2, width: "100%", mb: 2 }}>
            <Button
              variant="contained"
              startIcon={<EditIcon />}
              sx={{ backgroundColor: "#7681A1", flex: 1 }}
              onClick={handleUpdate}
            >
              Editar perfil
            </Button>
            <Button
              variant="contained"
              startIcon={<ExitToAppIcon />}
              sx={{ backgroundColor: "#7681A1", flex: 1 }}
              onClick={handleLogout}
            >
              Sair
            </Button>
          </Box>

          {/* Botão de Excluir conta */}
          <Box sx={{ width: "100%", mt: 3 }}>
            <Button
              variant="outlined"
              sx={{
                color: "red",
                borderColor: "red",
                width: "100%",
                top: "-39px",
                padding: "12px", // Aumenta o botão para melhorar a visibilidade
              }}
              onClick={handleDelete}
            >
              Excluir conta
            </Button>
          </Box>
        </Box>
      </Box>
    );
  }

  export default Perfil;