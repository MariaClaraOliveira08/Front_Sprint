import React, { useEffect, useState } from "react";
import { Box, TextField, Button, Avatar, CircularProgress, Typography, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; // Importar ícone de voltar
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
    cpf: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("authenticated");
    navigate("/login", { replace: true });
  };

  const handleGoBack = () => {
    navigate(-1); // Volta para a página anterior
  };

  useEffect(() => {
    async function fetchUserData() {
      try {
        if (!userId) {
          setError("ID do usuário não encontrado.");
          setLoading(false);
          return;
        }

        const response = await api.get(`/user/${userId}`);
        const userData = response.data.user;

        setUser({
          id: userId,
          name: userData.nome || "",
          email: userData.email || "",
          password: "",
          cpf: userData.cpf || "",
        });

      } catch (err) {
        console.error("Erro ao carregar dados do usuário:", err);
        setError("Não foi possível carregar os dados do perfil.");
      } finally {
        setLoading(false);
      }
    }
    fetchUserData();
  }, [userId]);

  const handleUpdate = async () => {
    try {
      const dataToUpdate = {
        nome: user.name,
        email: user.email,
        id: user.id,
        cpf: user.cpf,
      };

      if (user.password) {
        dataToUpdate.senha = user.password;
        dataToUpdate.confirmarSenha = user.password;
      }

      await api.put(`/user/${user.id}`, dataToUpdate);
      alert("Perfil atualizado com sucesso!");
    } catch (err) {
      console.error("Erro ao atualizar os dados:", err);
      alert("Erro ao atualizar os dados do usuário. Por favor, tente novamente.");
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Você tem certeza que deseja excluir sua conta?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/user/${user.id}`);
      alert("Sua conta foi excluída com sucesso.");
      handleLogout();
    } catch (err) {
      console.error("Erro ao excluir o usuário:", err);
      alert("Erro ao excluir o usuário.");
    }
  };

  const onChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#F0F2F5' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column', backgroundColor: '#F0F2F5' }}>
        <Typography variant="h6" color="error">{error}</Typography>
        <Button onClick={() => navigate("/login")}>Ir para o Login</Button>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#F0F2F5", // Cor de fundo principal do protótipo
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pt: 4, // Padding top ajustado
        boxSizing: "border-box",
        position: "relative", // Para posicionar o botão de voltar
      }}
    >
      {/* Botão de Voltar */}
      <IconButton
        onClick={handleGoBack}
        sx={{
          position: 'absolute',
          top: 16,
          left: 16,
          color: '#333', // Cor do ícone
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
          },
          p: 1, // Padding ajustado
        }}
      >
        <ArrowBackIcon />
      </IconButton>

      {/* Título "Front Perfil" */}
      <Typography variant="h6" sx={{ mb: 4, color: '#333', textAlign: 'center' }}>
        Front Perfil
      </Typography>

      {/* Avatar (posicionado acima do card) */}
      <Avatar
        src="https://www.petz.com.br/blog/wp-content/uploads/2021/11/cachorro-trocando-dente-2.jpg" // Imagem de exemplo
        alt="Foto do perfil"
        sx={{
          width: 120,
          height: 120,
          mt: 2, // Espaçamento do título
          border: "4px solid white",
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Sombra para destaque
        }}
      />

      {/* Card do Formulário */}
      <Box
        sx={{
          width: "100%",
          maxWidth: 400,
          mt: -6, // Para o avatar se sobrepor ao card
          backgroundColor: "#FFFFFF", // Fundo do card
          borderRadius: 4, // Bordas arredondadas
          boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.1)', // Sombra no card
          p: 4, // Padding interno do card
          display: "flex",
          flexDirection: "column",
          gap: 3,
          alignItems: "center",
          position: 'relative', // Para o conteúdo interno
        }}
      >
        <TextField
          label="Nome"
          name="name"
          value={user.name}
          onChange={onChange}
          variant="outlined"
          fullWidth
          InputLabelProps={{ shrink: true }} // Para o label flutuar sempre
          sx={{
            '.MuiInputBase-root': { borderRadius: '8px' },
            '.MuiOutlinedInput-notchedOutline': { borderColor: '#B0B0B0' },
            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#7681A1',
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#7681A1',
            },
          }}
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={user.email}
          onChange={onChange}
          variant="outlined"
          fullWidth
          InputLabelProps={{ shrink: true }}
          sx={{
            '.MuiInputBase-root': { borderRadius: '8px' },
            '.MuiOutlinedInput-notchedOutline': { borderColor: '#B0B0B0' },
            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#7681A1',
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#7681A1',
            },
          }}
        />
        <TextField
          label="Senha"
          name="password"
          type="password"
          value={user.password}
          onChange={onChange}
          variant="outlined"
          fullWidth
          placeholder="Deixe em branco para não alterar"
          InputLabelProps={{ shrink: true }}
          sx={{
            '.MuiInputBase-root': { borderRadius: '8px' },
            '.MuiOutlinedInput-notchedOutline': { borderColor: '#B0B0B0' },
            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#7681A1',
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#7681A1',
            },
          }}
        />

        <Box sx={{ display: "flex", gap: 2, width: "100%", mt: 2 }}>
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            sx={{
              backgroundColor: "#7681A1",
              flex: 1,
              borderRadius: '8px',
              py: 1.5, // Aumenta a altura do botão
              '&:hover': {
                backgroundColor: '#606B8F', // Escurece no hover
              }
            }}
            onClick={handleUpdate}
          >
            Editar perfil
          </Button>
          <Button
            variant="contained"
            startIcon={<ExitToAppIcon />}
            sx={{
              backgroundColor: "#7681A1",
              flex: 1,
              borderRadius: '8px',
              py: 1.5,
              '&:hover': {
                backgroundColor: '#606B8F',
              }
            }}
            onClick={handleLogout}
          >
            Sair
          </Button>
        </Box>

        <Box sx={{ width: "100%", mt: 3, textAlign: 'center' }}>
          <Button
            variant="outlined"
            sx={{
              color: "red",
              borderColor: "red",
              width: "100%",
              borderRadius: '8px',
              py: 1.5,
              '&:hover': {
                backgroundColor: 'rgba(255, 0, 0, 0.05)',
              }
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