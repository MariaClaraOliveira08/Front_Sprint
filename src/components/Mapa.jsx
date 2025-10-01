import React, { useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, MarkerF, InfoWindowF } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%'
};

const center = {
  lat: -20.536479,
  lng: -47.405637
};

const Mapa = ({ apiUrl, searchType }) => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyD3aUrLEdn3S3HUg7SP9xwQoKNxL4AcCfw", // Sua chave aqui
  });

  const [places, setPlaces] = useState([]);
  const [activeMarker, setActiveMarker] = useState(null);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const params = new URLSearchParams({
          location: `${center.lat},${center.lng}`,
          radius: 5000,
          type: searchType,
        });
        const response = await fetch(`${apiUrl}?${params.toString()}`);
        if (!response.ok) {
          throw new Error('Erro ao carregar os dados da API.');
        }
        const data = await response.json();
        setPlaces(data);        
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    };
    fetchPlaces();
  }, [apiUrl, searchType]); // A dependência searchType garante que a requisição é feita quando a categoria muda

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  if (loadError) {
    return <div>Erro ao carregar o mapa.</div>;
  }

  if (!isLoaded) {
    return <div>Carregando Mapa...</div>;
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={13}
      onClick={() => setActiveMarker(null)}
    >
      {places.map(({ place_id, name, geometry, rating }) => (
        <MarkerF
          key={place_id}
          position={{
            lat: geometry.location.lat,
            lng: geometry.location.lng,
          }}
          onClick={() => handleActiveMarker(place_id)}
        >
          {activeMarker === place_id && (
            <InfoWindowF onCloseClick={() => setActiveMarker(null)}>
              <div>
                <h3>{name}</h3>
                <p>Avaliação: {rating || 'N/A'}</p>
              </div>
            </InfoWindowF>
          )}
        </MarkerF>
      ))}
    </GoogleMap>
  );
};

export default React.memo(Mapa);