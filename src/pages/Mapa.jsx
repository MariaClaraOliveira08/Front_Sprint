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
  const [selectedLugar, setSelectedLugar] = useState(null);
  const [lugares, setLugares] = useState([]); // lista de lugares da categoria
  const mapRef = useRef(null);

  // Se veio um lugar clicado no Home, seta ele
  useEffect(() => {
    if (location.state?.lugar) {
      const { lat, lng } = location.state.lugar;
      if (typeof lat === "number" && typeof lng === "number") {
        setSelectedLugar(location.state.lugar);
      }
    }
  }, [location.state]);

  // Busca todos os lugares da categoria selecionada (usando o 'type' que veio do Home)
  useEffect(() => {
    // ATENÇÃO: Agora esperamos 'categoriaType', que é uma string (ex: 'pizzeria', 'restaurant')
    if (mapRef.current && location.state?.categoriaType) { 
      const service = new window.google.maps.places.PlacesService(mapRef.current);

      const request = {
        location: new window.google.maps.LatLng(latitude, longitude),
        radius: 3000, // raio de busca em metros
        type: location.state.categoriaType, // USA A STRING DO TYPE
      };

      service.nearbySearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          setLugares(results);
        }
      });
    }
  }, [location.state?.categoriaType]); // DEPENDÊNCIA ALTERADA

  // Gera URL da foto do Google Places
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
          {/* Renderiza todos os marcadores da categoria */}
          {lugares.map((lugar, index) => (
            <Marker
              key={index}
              position={{
                lat: lugar.geometry.location.lat(),
                lng: lugar.geometry.location.lng(),
              }}
              onClick={() =>
                setSelectedLugar({
                  nome: lugar.name,
                  endereco: lugar.vicinity,
                  lat: lugar.geometry.location.lat(),
                  lng: lugar.geometry.location.lng(),
                  photos: lugar.photos,
                })
              }
            />
          ))}

          {/* InfoWindow quando clica em um marcador */}
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