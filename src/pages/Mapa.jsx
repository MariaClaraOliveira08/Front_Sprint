import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import HamburgerDrawer from "../components/HamburgerDrawer";
import { useLocation } from "react-router-dom";

const containerStyle = {
  width: "100vw",
  height: "100vh",
};

const Mapa = ({ latitude = -20.5381, longitude = -47.4008 }) => {
  const location = useLocation();
  const [selectedLugar, setSelectedLugar] = useState(null);

  useEffect(() => {
    if (location.state?.lugar) {
      const { lat, lng } = location.state.lugar;
      if (typeof lat === "number" && typeof lng === "number") {
        setSelectedLugar(location.state.lugar);
      }
    }
  }, [location.state]);

  const center = selectedLugar
    ? { lat: selectedLugar.lat, lng: selectedLugar.lng }
    : { lat: latitude, lng: longitude };

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <HamburgerDrawer />
      <LoadScript googleMapsApiKey="AIzaSyD3aUrLEdn3S3HUg7SP9xwQoKNxL4AcCfw">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={selectedLugar ? 16 : 13}
          options={{ streetViewControl: false, mapTypeControl: false, fullscreenControl: true, zoomControl: true }}
        >
          {selectedLugar && (
            <Marker position={{ lat: selectedLugar.lat, lng: selectedLugar.lng }} />
          )}
          {selectedLugar && (
            <InfoWindow
              position={{ lat: selectedLugar.lat, lng: selectedLugar.lng }}
              onCloseClick={() => setSelectedLugar(null)}
            >
              <div style={{ maxWidth: 250 }}>
                <h3>{selectedLugar.nome}</h3>
                <p>{selectedLugar.endereco}</p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default Mapa;
