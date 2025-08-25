import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Paper,
  Grid,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import StoreIcon from "@mui/icons-material/Store";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined"; 
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BarraLateral from "../components/BarraLateral";

export default function Home() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [estabelecimentos, setEstabelecimentos] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("");

  useEffect(() => {
    async function fetchEstabelecimentos() {
      try {
        const response = await axios.get("/buscar");
        setEstabelecimentos(response.data);
      } catch (error) {
        console.error("Erro ao carregar estabelecimentos:", error);
      }
    }
    fetchEstabelecimentos();
  }, []);

  const filteredEstabelecimentos = estabelecimentos
    .filter((r) => r.nome.toLowerCase().includes(search.toLowerCase()))
    .filter((r) => (categoriaSelecionada ? r.categoria === categoriaSelecionada : true));

  const handleCategoriaSelect = (categoria) => {
    setCategoriaSelecionada(categoria);
  };

  return (
    <Box sx={{ display: "flex", width: "100vw", height: "100vh", bgcolor: "#d3d3d3" }}>
      <BarraLateral />

      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          overflowY: "auto",
          p: 4,
          boxSizing: "border-box",
        }}
      >
        {/* Logo */}
        <Box display="flex" flexDirection="column" alignItems="flex-start" mb={4}>
          <Box display="flex" alignItems="center" gap={1}>
            <LocationOnOutlinedIcon sx={{ fontSize: 36, color: "#000", marginTop: "15px" }} />
            <Typography variant="h4" sx={{ fontWeight: "bold", marginTop: "20px" }}>
              Glimp
            </Typography>
          </Box>
          <Typography variant="subtitle2" sx={{ mt: 1.5, fontSize: 15 }}>
            Grandes Lugares Inspiram Momentos Perfeitos.
          </Typography>
        </Box>

        {/* Campo de busca */}
        <Box sx={{ display: "flex", mb: 2, width: "1020px", color:"#FFFF" }}>
          <TextField
            fullWidth
            placeholder="Pesquisar..."
            variant="outlined"
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              endAdornment: (
                <IconButton>
                  <SearchIcon />
                </IconButton>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "20px", // arredondado
              },
            }}
          />
        </Box>

        {/* Categorias */}
        <Box
          sx={{
            position: "sticky",
            top: 0,
            backgroundColor: "#d3d3d3",
            zIndex: 1,
            mb: 4,
          }}
        >
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Paper
                sx={{
                  p: 2,
                  cursor: "pointer",
                  backgroundColor: categoriaSelecionada === "restaurante" ? "#6c78b8" : "#fff",
                  borderRadius: 2,
                }}
                onClick={() => handleCategoriaSelect("restaurante")}
              >
                <RestaurantIcon fontSize="large" />
              </Paper>
            </Grid>
            <Grid item>
              <Paper
                sx={{
                  p: 2,
                  cursor: "pointer",
                  backgroundColor: categoriaSelecionada === "praia" ? "#6c78b8" : "#fff",
                  borderRadius: 2,
                }}
                onClick={() => handleCategoriaSelect("praia")}
              >
                <BeachAccessIcon fontSize="large" />
              </Paper>
            </Grid>
            <Grid item>
              <Paper
                sx={{
                  p: 2,
                  cursor: "pointer",
                  backgroundColor: categoriaSelecionada === "loja" ? "#6c78b8" : "#fff",
                  borderRadius: 2,
                }}
                onClick={() => handleCategoriaSelect("loja")}
              >
                <StoreIcon fontSize="large" />
              </Paper>
            </Grid>
          </Grid>
        </Box>

        {/* Lista de estabelecimentos */}
        {filteredEstabelecimentos.map((r) => (
          <Box
            key={r.id}
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 2,
              bgcolor: "#fff",
              borderRadius: 1,
              cursor: "pointer",
              p: 1,
            }}
            onClick={() => navigate(`/restaurante/${r.id}`)}
          >
            <Box
              sx={{
                width: "40px",
                height: "40px",
                bgcolor: r.cor || "#6c78b8",
                mr: 2,
                borderRadius: 1,
              }}
            />
            <Typography>{r.nome}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
