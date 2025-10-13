import React from "react";
import { Modal, Box, Typography, Button, Divider, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

const DetalhesModal = ({ open, onClose, lugar }) => {
  const navigate = useNavigate();

  if (!lugar) return null;

  // Lógica para processar a string de horários
  const horariosArray = lugar.horarios && typeof lugar.horarios === 'string'
    ? lugar.horarios.split('\n').filter(line => line.trim() !== '')
    : [];

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 3,
          maxHeight: '90vh', // Adicionado para telas menores
          overflowY: 'auto', // Adicionado para scroll
        }}
      >
        <Typography variant="h6" mb={2}>{lugar.nome}</Typography>
        <Typography mb={1}><strong>Endereço:</strong> {lugar.endereco}</Typography>
        <Typography mb={1}><strong>Categoria:</strong> {lugar.categoria}</Typography>
        <Typography mb={1}><strong>Telefone:</strong> {lugar.telefone}</Typography>
        <Typography mb={1}><strong>Avaliação:</strong> {lugar.avaliacao}</Typography>

        {/* ======================= EXIBIÇÃO ORGANIZADA DOS HORÁRIOS ======================= */}
        <Divider sx={{ my: 2 }} />
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#4a5a87' }}>
            Horários de Funcionamento:
        </Typography>

        {horariosArray.length > 0 ? (
            <Box sx={{ mt: 1, p: 1.5, bgcolor: '#f0f4ff', borderRadius: 1 }}>
                {horariosArray.map((horario, index) => {
                    // Divide a linha em Dia e Horário. Ex: "Segunda-feira: 18:00 – 23:00"
                    const match = horario.match(/^([^:]+):\s*(.*)$/);
                    const day = match ? match[1].trim() : horario.trim();
                    const time = match ? match[2].trim() : "Não Informado";
                    
                    const isClosed = time.toLowerCase() === 'fechado';

                    return (
                        <Box 
                            key={index} 
                            sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}
                        >
                            <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                                {day}:
                            </Typography>
                            <Typography 
                                variant="body2" 
                                sx={{ 
                                    fontWeight: 'bold', 
                                    color: isClosed ? 'error.main' : 'success.main' 
                                }}
                            >
                                {time}
                            </Typography>
                        </Box>
                    );
                })}
            </Box>
        ) : (
            <Typography variant="body2" sx={{ fontStyle: 'italic', mt: 1 }}>
                Horários não disponíveis.
            </Typography>
        )}
        {/* =================================================================================== */}
        
        <Divider sx={{ my: 2 }} />
        
        <Link
          onClick={() => navigate("/mapa", { state: { lugar } })}
          underline="hover"
          sx={{ display: "block", textAlign: "center", mb: 2, color: "#4a5a87", fontWeight: "bold", cursor: "pointer" }}
        >
          Ver no mapa
        </Link>

        <Divider sx={{ my: 2 }} />
        
        <Typography variant="subtitle1" mb={1}>Comentários:</Typography>
        {lugar.comentarios && lugar.comentarios.length > 0 ? (
          lugar.comentarios.map((c, index) => (
            <Box key={index} mb={1} sx={{ p: 1, bgcolor: '#f9f9f9', borderRadius: 1 }}>
              {/* Note: Os dados de comentários no seu objeto 'lugar' não incluem 'usuario' e 'nota' 
                 (apenas a string do comentário). Mantive a estrutura original, mas pode não exibir corretamente.
                 Se o campo 'comentarios' for apenas um array de strings, use: <Typography> - {c}</Typography> 
              */}
              <Typography variant="body2"><strong>Comentário:</strong> {c.texto || c}</Typography>
              {c.usuario && <Typography variant="caption"><strong>Usuário:</strong> {c.usuario}</Typography>}
              {c.nota && <Typography variant="caption"><strong>Nota:</strong> {c.nota}</Typography>}
              {index < lugar.comentarios.length - 1 && <Divider sx={{ my: 1 }} />}
            </Box>
          ))
        ) : (
          <Typography variant="body2" sx={{ fontStyle: 'italic' }}>Sem comentários.</Typography>
        )}

        <Button onClick={onClose} variant="contained" sx={{ mt: 2, width: '100%', bgcolor: '#4a5a87', '&:hover': { bgcolor: '#5c6c9e' } }}>
            Fechar
        </Button>
      </Box>
    </Modal>
  );
};

export default DetalhesModal;