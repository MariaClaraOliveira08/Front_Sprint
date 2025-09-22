// src/pages/Favoritos.jsx
import React, { useState, useEffect } from 'react';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import HamburgerDrawer from '../components/HamburgerDrawer';
import api from '../axios/axios';

const Favoritos = () => {
  const [favoritos, setFavoritos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Manter para exibir outros erros

  // Função para buscar os favoritos
  const fetchFavoritos = async () => {
    const token = localStorage.getItem('token');
    const id_usuario = localStorage.getItem('id_usuario'); // Garantir que 'id_usuario' está sendo armazenado corretamente

    if (!token || !id_usuario) {
      setLoading(false);  // Não fazer nada se não estiver autenticado
      return;  // Sai da função sem mostrar erro
    }

    try {
      const response = await api.get('/favoritos', {
        params: { id_usuario }, // Enviando o id_usuario para a API
      });
      setFavoritos(response.data.favoritos);
    } catch (error) {
      console.error('Erro ao buscar favoritos:', error.response?.data || error.message);
      setError('Erro ao carregar seus favoritos. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavoritos();
  }, []);

  return (
    <div style={styles.wrapper}>
      <HamburgerDrawer />
      <main style={styles.container}>
        <header style={styles.header}>
          <LocationOnOutlinedIcon sx={{ fontSize: 32, color: '#000000ff' }} />
          <h1 style={styles.logoText}>Glimp</h1>
        </header>
        <p style={styles.subtitulo}>Grandes Lugares Inspiram Momentos Perfeitos.</p>
        <div style={styles.searchBox}>
          <input type="text" placeholder="Pesquisar" style={styles.searchInput} />
          <SearchIcon sx={{ fontSize: 22, color: '#888' }} />
        </div>
        {loading ? (
          <p>Carregando favoritos...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : (
          <section style={styles.listaFavoritos}>
            {favoritos.length > 0 ? (
              favoritos.map((favorito) => (
                <div key={favorito.id_favorito} style={styles.card}>
                  <FavoriteBorderIcon sx={styles.favoriteIcon} />
                  <div>{favorito.nome_estabelecimento}</div>
                </div>
              ))
            ) : (
              <p>Você ainda não tem favoritos.</p>
            )}
          </section>
        )}
      </main>
    </div>
  );
};

const styles = {
  wrapper: {
    display: 'flex',
    height: '100vh',
    width: '100vw',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: '#f0f2f5',
    marginBottom: -10,
  },
  container: {
    flex: 1,
    padding: 32,
    paddingLeft: 240,
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    marginBottom: 40,
  },
  logoText: {
    margin: 5,
    fontSize: 32,
    fontWeight: '700',
    color: '#000000ff',
    userSelect: 'none',
  },
  subtitulo: {
    fontSize: 14,
    color: '#777',
    marginBottom: 20,
    marginTop: -40,
  },
  searchBox: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: '10px 20px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    maxWidth: 600,
    marginBottom: 40,
    border: '1px solid #ddd',
    marginTop: 10,
    marginLeft: 70,
  },
  searchInput: {
    flex: 1,
    border: 'none',
    outline: 'none',
    backgroundColor: 'transparent',
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  listaFavoritos: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: 24,
  },
  card: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 16,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    cursor: 'pointer',
    userSelect: 'none',
    marginLeft: -180,
    position: 'relative',
  },
  favoriteIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    fontSize: 26,
    color: '#e91e63',
  },
};

export default Favoritos;
