import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Rating,
  Modal,
  Fade,
  Backdrop,
  TextField,
  CircularProgress, // Importando o CircularProgress para o spinner de carregamento
} from "@mui/material";
import api from "../axios/axios"; // Importando o Axios configurado corretamente

function ModalAvaliacao({ open, onClose, avaliacao, onDelete, onUpdate }) {
  const [openDeleteModal, setOpenDeleteModal] = useState(false); // Modal de confirmação de deleção
  const [isEditing, setIsEditing] = useState(false);
  const [updatedNota, setUpdatedNota] = useState(avaliacao?.nota || 0);
  const [updatedComentario, setUpdatedComentario] = useState(avaliacao?.comentario || "");
  const [loading, setLoading] = useState(false); // Estado para controlar o carregamento

  // Quando clica em "Deletar Avaliação", abre o modal de confirmação
  const handleDeleteClick = () => {
    setOpenDeleteModal(true);
  };

  // Confirma exclusão
  const handleConfirmDelete = async () => {
    setLoading(true); // Inicia o carregamento ao tentar deletar

    try {
      if (avaliacao) {
        // Chama a função de deleção do componente pai
        await onDelete(avaliacao);
        setOpenDeleteModal(false); // Fecha o modal de confirmação
        onClose(); // Fecha o modal principal
      }
    } catch (error) {
      console.error("Erro ao deletar avaliação", error);
      alert(`Ocorreu um erro ao deletar a avaliação. Detalhes: ${error.message}`);
    } finally {
      setLoading(false); // Fim do carregamento
    }
  };

  // Cancela exclusão
  const handleCancelDelete = () => {
    setOpenDeleteModal(false);
  };

  // Função para habilitar o modo de edição
  const enableEditing = () => {
    setIsEditing(true); // Ativa o modo de edição
  };

  // Função para atualizar a avaliação via API
  const handleUpdateClick = async () => {
    setLoading(true); // Inicia o carregamento ao clicar em "Salvar Alterações"
    const updatedAvaliacao = {
      ...avaliacao,
      nota: updatedNota,
      comentario: updatedComentario,
    };

    try {
      // Chama a API para atualizar a avaliação
      const response = await api.atualizarAvaliacao(updatedAvaliacao);

      // Verifica se a resposta foi bem-sucedida
      if (response && response.status === 200 && response.data) {
        console.log("Avaliação atualizada:", response.data);
        // Chama a função de atualização no componente pai
        onUpdate(response.data); // Atualiza o estado no componente pai
        setIsEditing(false); // Desabilita o modo de edição
        onClose(); // Fecha o modal
      } else {
        throw new Error(`Erro na resposta da API: ${response.status}`);
      }
    } catch (error) {
      console.error("Erro ao atualizar avaliação", error);
      // Exibe uma mensagem de erro mais detalhada
      alert(`Ocorreu um erro ao atualizar a avaliação. Detalhes do erro: ${error.message}`);
    } finally {
      setLoading(false); // Fim do carregamento
    }
  };

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 400 }}
      >
        <Fade in={open}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: "90%", sm: 450 },
              maxHeight: "80vh",
              overflowY: "auto",
              backgroundColor: "#D9D9D9",
              borderRadius: 3,
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography variant="h6" sx={{ color: "#4a5a87", mb: 1 }}>
              {avaliacao?.nome_estabelecimento || "Estabelecimento"}
            </Typography>

            {avaliacao?.endereco && (
              <Typography variant="body2" sx={{ color: "#666", mb: 1 }}>
                Endereço: {avaliacao.endereco}
              </Typography>
            )}

            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography variant="subtitle1">{avaliacao?.usuario || "Você"}</Typography>
              {!isEditing ? (
                <Rating value={avaliacao?.nota || 0} readOnly size="small" />
              ) : (
                <Rating
                  value={updatedNota}
                  onChange={(e, newValue) => setUpdatedNota(newValue)}
                  size="small"
                />
              )}
            </Box>

            {!isEditing ? (
              <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
                {avaliacao?.comentario || "-"}
              </Typography>
            ) : (
              <TextField
                label="Comentário"
                value={updatedComentario}
                onChange={(e) => setUpdatedComentario(e.target.value)}
                multiline
                rows={4}
                fullWidth
                variant="outlined"
                sx={{ mb: 2 }}
              />
            )}

            <Box mt={3} sx={{ display: "flex", gap: 1 }}>
              <Button
                variant="outlined"
                color="error"
                onClick={handleDeleteClick}
                fullWidth
                sx={{ borderRadius: 2 }}
              >
                Deletar Avaliação
              </Button>

              <Button
                variant="outlined"
                onClick={onClose}
                fullWidth
                sx={{ borderRadius: 2 }}
              >
                Fechar
              </Button>

              {!isEditing ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={enableEditing}
                  fullWidth
                  sx={{ borderRadius: 2 }}
                >
                  Atualizar Avaliação
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleUpdateClick}
                  fullWidth
                  sx={{ borderRadius: 2 }}
                  disabled={loading} // Desabilita o botão enquanto está carregando
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : "Salvar Alterações"}
                </Button>
              )}
            </Box>
          </Box>
        </Fade>
      </Modal>

      {/* Modal de confirmação para deletar */}
      <Modal
        open={openDeleteModal}
        onClose={handleCancelDelete}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 400 }}
      >
        <Fade in={openDeleteModal}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: "90%", sm: 400 },
              backgroundColor: "#fff",
              borderRadius: 3,
              boxShadow: 24,
              p: 4,
              textAlign: "center",
            }}
          >
            <Typography variant="h6" sx={{ mb: 2, color: "#4a5a87" }}>
              Tem certeza que deseja deletar esta avaliação?
            </Typography>

            <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
              <Button
                variant="contained"
                color="error"
                onClick={handleConfirmDelete} // Confirma a deleção
                disabled={loading} // Desabilita o botão enquanto está carregando
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : "Sim"}
              </Button>
              <Button
                variant="outlined"
                onClick={handleCancelDelete} // Cancela a deleção
              >
                Não
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

export default ModalAvaliacao;