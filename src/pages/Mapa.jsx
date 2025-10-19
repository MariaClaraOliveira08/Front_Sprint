import React, { useState, useEffect, useRef } from "react";
import { GoogleMap, LoadScript, InfoWindow, Marker } from "@react-google-maps/api";
import HamburgerDrawer from "../components/HamburgerDrawer";
import { useLocation } from "react-router-dom";

const containerStyle = {
  width: "100vw",
  height: "100vh",
};

const GOOGLE_API_KEY = "AIzaSyD3aUrLEdn3S3HUg7SP9xwQoKNxL4AcCfw";

const Mapa = ({ latitude = -20.5381, longitude = -47.4008 }) => {
  const location = useLocation();
  const mapRef = useRef(null);

  const [selectedLugar, setSelectedLugar] = useState(null);
  const [lugares, setLugares] = useState([]);

  // ✅ Recebe os dados vindos do Home
  useEffect(() => {
    if (location.state?.lugares) {
      setLugares(location.state.lugares);
    }

    if (location.state?.lugar) {
      setSelectedLugar(location.state.lugar);
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

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <HamburgerDrawer />
      <LoadScript googleMapsApiKey={GOOGLE_API_KEY} libraries={["places"]}>
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
          {/* 🔴 Marcadores de todos os lugares */}
          {lugares.map((lugar, index) => (
            <Marker
              key={index}
              position={{ lat: lugar.lat, lng: lugar.lng }}
              onClick={() => setSelectedLugar(lugar)}
            />
          ))}

          {/* 📍 InfoWindow do lugar selecionado */}
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
    </div>
  );
};

export default Mapa;
