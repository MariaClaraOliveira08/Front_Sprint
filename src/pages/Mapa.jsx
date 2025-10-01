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
import SidebarAvaliacoes from "../components/SidebarAvaliacoes"; // IMPORTAR COMPONENTE
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
  const [idUsuario, setIdUsuario] = useState(null);
  const [token, setToken] = useState(null);

  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId") || localStorage.getItem("idUsuario");
    const tokenLocal = localStorage.getItem("token");

    if (userId) setIdUsuario(userId);
    if (tokenLocal) setToken(tokenLocal);
  }, []);

  useEffect(() => {
    if (location.state?.lugar) {
      const { lat, lng } = location.state.lugar;
      if (typeof lat === "number" && typeof lng === "number") {
        setSelectedLugar(location.state.lugar);
      }
    }
  }, [location.state]);

  const getFotoURL = (lugar) => {
    if (lugar.photos && lugar.photos.length > 0) {
      return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${lugar.photos[0].photo_reference}&key=${GOOGLE_API_KEY}`;
    }
    return null;
  };

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

  const center = selectedLugar
    ? { lat: selectedLugar.lat, lng: selectedLugar.lng }
    : { lat: latitude, lng: longitude };

  return (
    <Box sx={{ display: "flex", width: "100vw", height: "100vh" }}>
      <HamburgerDrawer />

      {/* Barra lateral */}
      {selectedLugar && (
        <SidebarAvaliacoes googlePlaceId={selectedLugar.place_id} userId={idUsuario} />
      )}

      {/* Mapa */}
      <Box sx={{ flex: 1 }}>
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
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </LoadScript>
      </Box>
    </Box>
  );
};

export default Mapa;
