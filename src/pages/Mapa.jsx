import React, { useState, useEffect, useRef, useCallback } from "react";
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
  const [lugares, setLugares] = useState([]);
  const mapRef = useRef(null);

  const tipoBusca = location.state?.categoria;
  const palavraChave = location.state?.keyword;

  // Função para buscar lugares: tenta nearbySearch e faz fallback com textSearch
  const buscarLugares = useCallback(
    (mapInstance, tipo, keyword) => {
      if (!mapInstance || !tipo) {
        setLugares([]);
        return;
      }

      const service = new window.google.maps.places.PlacesService(mapInstance);

      const nearbyRequest = {
        location: new window.google.maps.LatLng(latitude, longitude),
        radius: 50000, // aumenta o raio para garantir mais resultados
        type: tipo,
        keyword: keyword || "",
      };

      service.nearbySearch(nearbyRequest, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK && results.length > 0) {
          const lugaresValidos = results.filter(
            (l) => l.geometry?.location?.lat() && l.geometry?.location?.lng()
          );
          setLugares(lugaresValidos);
        } else {
          // Fallback usando textSearch para pegar lugares famosos ou nomes específicos
          const textRequest = {
            query: keyword ? `${keyword} em Franca` : tipo,
            location: new window.google.maps.LatLng(latitude, longitude),
            radius: 50000,
          };

          service.textSearch(textRequest, (textResults, textStatus) => {
            if (textStatus === window.google.maps.places.PlacesServiceStatus.OK && textResults.length > 0) {
              const lugaresValidos = textResults.filter(
                (l) => l.geometry?.location?.lat() && l.geometry?.location?.lng()
              );
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
              onClick={() =>
                setSelectedLugar({
                  nome: lugar.name,
                  endereco: lugar.vicinity || lugar.formatted_address,
                  lat: lugar.geometry.location.lat(),
                  lng: lugar.geometry.location.lng(),
                  photos: lugar.photos,
                })
              }
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
      </LoadScript>
    </div>
  );
};

export default Mapa;
