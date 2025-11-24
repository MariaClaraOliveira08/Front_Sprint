import React, { useState, useEffect, useRef } from "react";
import { GoogleMap, useJsApiLoader, InfoWindow, Marker } from "@react-google-maps/api";
import HamburgerDrawer from "../components/HamburgerDrawer";
import SidebarAvaliacoes from "../components/SidebarAvaliacoes";
import { useLocation } from "react-router-dom";

const containerStyle = {
  width: "100vw",
  height: "100vh",
};

const GOOGLE_API_KEY = "AIzaSyAGYyG00B3fNe91e3BAtf7k2nK79-HPDBY";

const Mapa = ({ latitude = -20.5381, longitude = -47.4008 }) => {
  const location = useLocation();
  const mapRef = useRef(null);

  const [selectedLugar, setSelectedLugar] = useState(null);
  const [lugares, setLugares] = useState([]);

  //Método recomendado para carregar o Google Maps
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_API_KEY,
    libraries: ["places"],
  });

  useEffect(() => {
    if (location.state?.lugares) {
      setLugares(location.state.lugares);
      localStorage.setItem("lugares", JSON.stringify(location.state.lugares));
    } else {
      const lugaresSalvos = localStorage.getItem("lugares");
      if (lugaresSalvos) {
        setLugares(JSON.parse(lugaresSalvos));
      }
    }

    if (location.state?.lugar) {
      setSelectedLugar(location.state.lugar);
      localStorage.setItem("lugar", JSON.stringify(location.state.lugar));
    } else {
      const lugarSalvo = localStorage.getItem("lugar");
      if (lugarSalvo) {
        setSelectedLugar(JSON.parse(lugarSalvo));
      }
    }
  }, [location.state]);

  const getFotoURL = (lugar) => {
    if (lugar.photos && lugar.photos.length > 0) {
      return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${lugar.photos[0].photo_reference}&key=${GOOGLE_API_KEY}`;
    }
    return null;
  };

  const center = selectedLugar
    ? { lat: selectedLugar.lat, lng: selectedLugar.lng }
    : { lat: latitude, lng: longitude };

  //Exibe loading enquanto o mapa carrega
  if (!isLoaded) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <h3>Carregando mapa...</h3>
      </div>
    );
  }

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <HamburgerDrawer />

      {selectedLugar && (
        <SidebarAvaliacoes
          googlePlaceId={selectedLugar.place_id}
          nomeEstabelecimento={selectedLugar.nome}
          endereco={selectedLugar.endereco}
        />
      )}

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={14}
        onLoad={(map) => (mapRef.current = map)}
        options={{
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: true,
          zoomControl: true,
        }}
      >
        {lugares.map((lugar, index) => (
          <Marker
            key={index}
            position={{ lat: lugar.lat, lng: lugar.lng }}
            onClick={() => setSelectedLugar(lugar)}
          />
        ))}

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
    </div>
  );
};

export default Mapa;