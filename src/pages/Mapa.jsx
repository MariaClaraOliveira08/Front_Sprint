import React, { useState, useEffect, useRef } from "react";
import { GoogleMap, LoadScript, InfoWindow } from "@react-google-maps/api";
import {
  Modal,
  Box,
  Typography,
  Rating,
  TextField,
  Button,
  Backdrop,
  Fade,
} from "@mui/material";
import HamburgerDrawer from "../components/HamburgerDrawer";
import { useLocation } from "react-router-dom";
import api from "../axios/axios";

const GOOGLE_API_KEY = "AIzaSyD3aUrLEdn3S3HUg7SP9xwQoKNxL4AcCfw";
const libraries = ["places"];

const containerStyle = {
  width: "100vw",
  height: "100vh",
};

const Mapa = ({ latitude = -20.5381, longitude = -47.4008 }) => {
  const location = useLocation();

  const [selectedLugar, setSelectedLugar] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [nota, setNota] = useState(0);
  const [comentario, setComentario] = useState("");
  const [idUsuario, setIdUsuario] = useState(null);
  const [token, setToken] = useState(null);

  const mapRef = useRef(null);
  const markerRef = useRef(null);

  // Recupera ID do usuário e token do localStorage
  useEffect(() => {
    const userId = localStorage.getItem("userId") || localStorage.getItem("idUsuario");
    const tokenLocal = localStorage.getItem("token");

    if (userId) setIdUsuario(userId);
    if (tokenLocal) setToken(tokenLocal);
  }, []);

  // Atualiza lugar selecionado
  useEffect(() => {
    if (location.state?.lugar) {
      const { lat, lng } = location.state.lugar;
      if (typeof lat === "number" && typeof lng === "number") {
        setSelectedLugar(location.state.lugar);
      }
    }
  }, [location.state]);

  // URL da foto do Google Places
  const getFotoURL = (lugar) => {
    if (lugar.photos && lugar.photos.length > 0) {
      return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${lugar.photos[0].photo_reference}&key=${GOOGLE_API_KEY}`;
    }
    return null;
  };

  // Cria marcador no mapa
  useEffect(() => {
    if (!mapRef.current || !selectedLugar) return;

    if (markerRef.current) markerRef.current.setMap(null);

    const marker = new window.google.maps.marker.AdvancedMarkerElement({
      map: mapRef.current,
      position: { lat: selectedLugar.lat, lng: selectedLugar.lng },
      title: selectedLugar.nome,
    });

    markerRef.current = marker;

    return () => marker.setMap(null);
  }, [selectedLugar]);

  const handleAbrirModal = () => setOpenModal(true);
  const handleFecharModal = () => {
    setOpenModal(false);
    setNota(0);
    setComentario("");
  };

  // Envia avaliação para a API
  const handleEnviarAvaliacao = async () => {
    if (!token || !idUsuario) {
      alert("Você precisa estar autenticado para enviar uma avaliação.");
      return;
    }
  
    if (!nota || !comentario.trim()) {
      alert("Preencha a nota e o comentário.");
      return;
    }
  
    if (!selectedLugar?.place_id) {
      alert("ID do lugar não encontrado.");
      return;
    }
  
    try {
      console.log("Enviando avaliação:", {
        id_usuario: idUsuario,
        google_place_id: selectedLugar.place_id,
        nota,
        comentario,
      });
  
      await api.postAvaliacao(
        "/avaliacao",
        {
          id_usuario: idUsuario,
          google_place_id: selectedLugar.place_id,
          nota,
          comentario,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      alert("Avaliação enviada com sucesso!");
      handleFecharModal();
    } catch (error) {
      console.error("Erro ao enviar avaliação:", error.response || error);
      if (error.response?.status === 403) {
        alert("Você não tem permissão para enviar avaliação. Faça login novamente.");
      } else if (error.response?.status === 400) {
        alert("Erro nos dados enviados. Preencha corretamente todos os campos.");
      } else {
        alert("Erro ao enviar avaliação.");
      }
    }
  };

  const center = selectedLugar
    ? { lat: selectedLugar.lat, lng: selectedLugar.lng }
    : { lat: latitude, lng: longitude };

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <HamburgerDrawer />
      <LoadScript googleMapsApiKey={GOOGLE_API_KEY} libraries={libraries}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={selectedLugar ? 16 : 13}
          onLoad={(map) => (mapRef.current = map)}
          options={{
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: true,
            zoomControl: true,
          }}
        >
          {selectedLugar && (
            <InfoWindow
              position={{ lat: selectedLugar.lat, lng: selectedLugar.lng }}
              onCloseClick={() => setSelectedLugar(null)}
            >
              <div style={{ maxWidth: 250 }}>
                <h3>{selectedLugar.nome}</h3>
                <p>{selectedLugar.endereco}</p>
                {getFotoURL(selectedLugar) && (
                  <img
                    src={getFotoURL(selectedLugar)}
                    alt={selectedLugar.nome}
                    style={{ width: "100%", borderRadius: 8, marginTop: 10 }}
                  />
                )}
                <Button
                  variant="contained"
                  onClick={handleAbrirModal}
                  size="small"
                  sx={{
                    mt: 2,
                    backgroundColor: "#4a5a87",
                    "&:hover": { backgroundColor: "#36406a" },
                  }}
                >
                  Avaliar
                </Button>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>

      {/* MODAL DE AVALIAÇÃO */}
      <Modal
        open={openModal}
        onClose={handleFecharModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 300 }}
      >
        <Fade in={openModal}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: 300, sm: 400 },
              bgcolor: "background.paper",
              borderRadius: 3,
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography variant="h6" sx={{ color: "#4a5a87", mb: 2 }}>
              Avaliar {selectedLugar?.nome}
            </Typography>
            <Rating
              name="avaliacao"
              value={nota}
              onChange={(event, newValue) => setNota(newValue || 0)}
              size="large"
            />
            <TextField
              label="Comentário"
              multiline
              rows={4}
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              fullWidth
              sx={{ mt: 2 }}
            />
            <Button
              variant="contained"
              fullWidth
              onClick={handleEnviarAvaliacao}
              sx={{
                mt: 3,
                backgroundColor: "#4a5a87",
                "&:hover": { backgroundColor: "#36406a" },
              }}
            >
              Enviar Avaliação
            </Button>
            <Button
              fullWidth
              onClick={handleFecharModal}
              sx={{ mt: 1 }}
              variant="outlined"
            >
              Cancelar
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default Mapa;
