import React, { useState, useEffect, useRef, useCallback } from "react";
import { GoogleMap, LoadScript, InfoWindow, Marker } from "@react-google-maps/api";
import HamburgerDrawer from "../components/HamburgerDrawer";
import { useLocation } from "react-router-dom";
import api from "../axios/axios";

const containerStyle = {
  width: "100vw",
  height: "100vh",
};

const GOOGLE_API_KEY = "AIzaSyD3aUrLEdn3S3HUg7SP9xwQoKNxL4AcCfw";

const Mapa = ({ latitude = -20.5381, longitude = -47.4008 }) => {
  const location = useLocation();
  const [selectedLugar, setSelectedLugar] = useState(null);
  const [lugares, setLugares] = useState([]);
  const [favorito, setFavorito] = useState(false);
  const [avaliacao, setAvaliacao] = useState(0);
  const [comentario, setComentario] = useState("");

  const mapRef = useRef(null);
  const tipoBusca = location.state?.categoria;
  const palavraChave = location.state?.keyword;

  // Buscar lugares
  const buscarLugares = useCallback(
    (mapInstance, tipo, keyword) => {
      if (!mapInstance || !tipo) {
        setLugares([]);
        return;
      }
      const service = new window.google.maps.places.PlacesService(mapInstance);
      const nearbyRequest = {
        location: new window.google.maps.LatLng(latitude, longitude),
        radius: 50000,
        type: tipo,
        keyword: keyword || "",
      };
      service.nearbySearch(nearbyRequest, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK && results.length > 0) {
          const lugaresValidos = results.filter(l => l.geometry?.location?.lat() && l.geometry?.location?.lng());
          setLugares(lugaresValidos);
        } else {
          const textRequest = {
            query: keyword ? `${keyword} em Franca` : tipo,
            location: new window.google.maps.LatLng(latitude, longitude),
            radius: 50000,
          };
          service.textSearch(textRequest, (textResults, textStatus) => {
            if (textStatus === window.google.maps.places.PlacesServiceStatus.OK && textResults.length > 0) {
              const lugaresValidos = textResults.filter(l => l.geometry?.location?.lat() && l.geometry?.location?.lng());
              setLugares(lugaresValidos);
            } else {
              console.warn("Nenhum resultado encontrado:", textStatus);
              setLugares([]);
            }
          });
        }
      });
    },
    [latitude, longitude]
  );

  useEffect(() => {
    if (mapRef.current && tipoBusca) {
      buscarLugares(mapRef.current, tipoBusca, palavraChave);
    }
  }, [tipoBusca, palavraChave, buscarLugares]);

  const handleMapLoad = (map) => {
    mapRef.current = map;
    if (tipoBusca) {
      buscarLugares(map, tipoBusca, palavraChave);
    }
  };

  const center = selectedLugar
    ? { lat: selectedLugar.lat, lng: selectedLugar.lng }
    : { lat: latitude, lng: longitude };

  const getFotoURL = (lugar) => {
    if (lugar.photos && lugar.photos.length > 0) {
      const photoReference = lugar.photos[0].photo_reference || lugar.photos[0];
      return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${GOOGLE_API_KEY}`;
    }
    return null;
  };

  // Favoritar
  const handleFavoritar = async () => {
    try {
      if (!favorito) {
        await api.postFavorito({ place_id: selectedLugar.place_id });
        setFavorito(true);
      } else {
        await api.deleteFavorito(selectedLugar.place_id);
        setFavorito(false);
      }
    } catch (err) {
      console.error("Erro ao favoritar:", err);
    }
  };

  // Enviar avaliação
  const handleEnviarAvaliacao = async () => {
    if (avaliacao === 0) return alert("Selecione uma nota de 1 a 5");
    try {
      await api.postAvaliacao({
        google_place_id: selectedLugar.place_id,
        nota: avaliacao,
        comentario,
      });
      alert("Avaliação enviada!");
      setComentario("");
      setAvaliacao(0);
    } catch (err) {
      console.error("Erro ao enviar avaliação:", err);
    }
  };

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <HamburgerDrawer />
      <LoadScript googleMapsApiKey={GOOGLE_API_KEY} libraries={["places"]}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={14}
          onLoad={handleMapLoad}
          options={{
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: true,
            zoomControl: true,
          }}
        >
          {lugares.map((lugar, index) => (
            <Marker
              key={lugar.place_id || index}
              position={{
                lat: lugar.geometry.location.lat(),
                lng: lugar.geometry.location.lng(),
              }}
              onClick={() => {
                setSelectedLugar({
                  nome: lugar.name,
                  endereco: lugar.vicinity || lugar.formatted_address,
                  lat: lugar.geometry.location.lat(),
                  lng: lugar.geometry.location.lng(),
                  photos: lugar.photos,
                  place_id: lugar.place_id,
                });
                setFavorito(false); // opcional: verificar se já é favorito via API
                setAvaliacao(0);
                setComentario("");
              }}
            />
          ))}

          {selectedLugar && (
            <InfoWindow
              position={{ lat: selectedLugar.lat, lng: selectedLugar.lng }}
              onCloseClick={() => setSelectedLugar(null)}
            >
              <div style={{ maxWidth: 300 }}>
                <h3>{selectedLugar.nome}</h3>
                <p>{selectedLugar.endereco}</p>
                {getFotoURL(selectedLugar) && (
                  <img
                    src={getFotoURL(selectedLugar)}
                    alt={selectedLugar.nome}
                    style={{ width: "100%", borderRadius: 8, marginBottom: 10 }}
                  />
                )}

                {/* Favoritar */}
                <button onClick={handleFavoritar} style={{ marginBottom: 10 }}>
                  {favorito ? "Remover dos favoritos ❤️" : "Adicionar aos favoritos 🤍"}
                </button>

                {/* Avaliação */}
                <div style={{ marginBottom: 10 }}>
                  {[1,2,3,4,5].map((n) => (
                    <span
                      key={n}
                      style={{ cursor: "pointer", color: n <= avaliacao ? "gold" : "#ccc", fontSize: 20 }}
                      onClick={() => setAvaliacao(n)}
                    >
                      ★
                    </span>
                  ))}
                </div>

                {/* Comentário */}
                <textarea
                  placeholder="Escreva um comentário..."
                  value={comentario}
                  onChange={(e) => setComentario(e.target.value)}
                  style={{ width: "100%", marginBottom: 10 }}
                />

                <button onClick={handleEnviarAvaliacao}>Enviar Avaliação</button>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default Mapa;
