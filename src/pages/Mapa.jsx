import React, { useState, useEffect, useRef, useCallback } from "react";
import { GoogleMap, LoadScript, InfoWindow, Marker } from "@react-google-maps/api";
import HamburgerDrawer from "../components/HamburgerDrawer";
import { useLocation } from "react-router-dom";

const containerStyle = {
  width: "100vw",
  height: "100vh",
};

// **IMPORTANTE**: Substitua esta chave pela sua chave real!
const GOOGLE_API_KEY = "AIzaSyD3aUrLEdn3S3HUg7SP9xwQoKNxL4AcCfw"; 

const Mapa = ({ latitude = -20.5381, longitude = -47.4008 }) => { // Coordenadas de Franca/SP
  const location = useLocation();
  const [selectedLugar, setSelectedLugar] = useState(null);
  const [lugares, setLugares] = useState([]);
  const mapRef = useRef(null);

  // Extrai o tipo de busca (subcategoria) do estado de navegação
  const tipoBusca = location.state?.categoria;

  // Função para buscar os lugares no Google Maps usando useCallback para otimização
  const buscarLugares = useCallback((mapInstance, tipo) => {
    if (!mapInstance || !tipo) {
      setLugares([]); // Limpa se não houver filtro
      return;
    }

    const service = new window.google.maps.places.PlacesService(mapInstance);

    const request = {
      location: new window.google.maps.LatLng(latitude, longitude),
      radius: 50000, // Raio de busca (50km deve cobrir bem a cidade)
      type: tipo, // Usa o tipo da subcategoria (ex: "pizza_restaurant")
    };

    service.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
        // Filtra para garantir que as coordenadas são válidas
        const lugaresValidos = results.filter(l => l.geometry?.location?.lat() && l.geometry?.location?.lng());
        setLugares(lugaresValidos);
      } else {
        console.error("Places service failed: " + status);
        setLugares([]);
      }
    });
  }, [latitude, longitude]); // Dependências do useCallback

  // Efeito que lida com o estado inicial e a mudança de categoria
  useEffect(() => {
    if (location.state?.lugar) {
      // Se veio um lugar individual (clicado na lista da Home), centraliza nele
      const { lat, lng, nome, endereco, photos } = location.state.lugar;
      if (typeof lat === "number" && typeof lng === "number") {
        setSelectedLugar({ nome, endereco, lat, lng, photos });
      }
    } else {
      setSelectedLugar(null);
    }
    
    // Se o mapa já estiver carregado E tivermos um filtro de busca, realiza a busca
    if (mapRef.current && tipoBusca) {
      buscarLugares(mapRef.current, tipoBusca);
    }

  }, [location.state, tipoBusca, buscarLugares]);

  // Função chamada quando o mapa é carregado
  const handleMapLoad = (map) => {
    mapRef.current = map;
    // Garante que a busca inicie se houver um tipo de busca definido
    if (tipoBusca) {
      buscarLugares(map, tipoBusca);
    }
  }

  // Gera URL da foto do Google Places
  const getFotoURL = (lugar) => {
    // Se o lugar veio da API do Google, ele já tem 'photos' com 'photo_reference'
    if (lugar.photos && lugar.photos.length > 0) {
      // Verifica se é o objeto do Places API ou o objeto customizado
      const photoReference = lugar.photos[0].photo_reference || lugar.photos[0];
      return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${GOOGLE_API_KEY}`;
    }
    return null;
  };

  // Define o centro do mapa: lugar selecionado ou centro de Franca
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
          onLoad={handleMapLoad} 
          options={{
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: true,
            zoomControl: true,
          }}
        >
          {/* Renderiza todos os marcadores da categoria/subcategoria */}
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
                  endereco: lugar.vicinity,
                  lat: lugar.geometry.location.lat(),
                  lng: lugar.geometry.location.lng(),
                  photos: lugar.photos,
                })
              }
            />
          ))}

          {/* Renderiza um marcador adicional se um lugar específico foi selecionado na Home */}
          {selectedLugar && !lugares.find(l => l.place_id === selectedLugar.place_id) && (
              <Marker
                position={{ lat: selectedLugar.lat, lng: selectedLugar.lng }}
                onClick={() => setSelectedLugar(selectedLugar)}
                  // Icone diferente para destacar
                icon={{ url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png" }}
              />
          )}

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