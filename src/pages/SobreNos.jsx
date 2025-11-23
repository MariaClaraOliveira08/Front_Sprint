import React from "react";
import { useTheme, useMediaQuery, Box, Typography } from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import HamburgerDrawer from "../components/HamburgerDrawer";

const SobreNos = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width:600px)");
  const isTablet = useMediaQuery("(max-width:900px)");

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        fontFamily: "Segoe UI, sans-serif",
        backgroundColor: "#f5f5f5",
        margin: 0,
        padding: 0,
        boxSizing: "border-box",
      }}
    >
      <HamburgerDrawer />

      {/* Container principal */}
      <Box
        sx={{
          flex: 1,
          p: isMobile ? 2 : isTablet ? 4 : 6,
          pl: isMobile ? 2 : isTablet ? 10 : 25,
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#f5f5f5",
          overflowY: "auto",
        }}
      >
        {/* Cabeçalho */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            flexWrap: "wrap",
          }}
        >
          <LocationOnOutlinedIcon sx={{ fontSize: 36, color: "#000" }} />
          <Typography
            variant={isMobile ? "h5" : "h4"}
            sx={{ color: "#4a5a87", fontWeight: 700 }}
          >
            Glimp
          </Typography>
        </Box>

        <Typography
          variant="subtitle1"
          sx={{
            fontSize: isMobile ? 13 : 15,
            color: "#777",
            mb: 3,
            mt: 1,
          }}
        >
          Grandes Lugares Inspiram Momentos Perfeitos.
        </Typography>

        {/* Card principal */}
        <Box
          sx={{
            backgroundColor: "#ddd",
            p: isMobile ? 2 : 3,
            borderRadius: 3,
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            mb: 3,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
            Sobre nós:
          </Typography>
          <Typography>
            Somos apaixonados por conectar pessoas aos melhores lugares para
            criar experiências inesquecíveis.
          </Typography>
        </Box>



        {/* Instagram Section */}
        <Box
          sx={{
            mt: 5,
            backgroundColor: "#ddd",
            borderRadius: 3,
            p: isMobile ? 2 : 3,
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <Typography
            variant="h6"
            sx={{ color: "#4a5a87", fontWeight: "bold", mb: 2 }}
          >
            Siga-nos no Instagram
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            {[
              ["mahh.oliveira07", "https://www.instagram.com/mahh.oliveira07/#"],
              ["prieloize", "https://instagram.com/prieloize"],
              ["gabb_ignacio", "https://instagram.com/gabb_ignacio"],
              ["livreys", "https://instagram.com/livreys"],
              ["m.lureys", "https://instagram.com/m.lureys"],
              ["guilherme_guimaraes11", "https://instagram.com/guilherme_guimaraes11"],
              ["leo.pedrosoo", "https://instagram.com/leo.pedrosoo"],
            ].map(([user, link]) => (
              <a
                key={user}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  textDecoration: "none",
                  color: "#333",
                  fontWeight: 500,
                  fontSize: isMobile ? 14 : 16,
                }}
              >
                <InstagramIcon sx={{ color: "#E1306C", fontSize: 28 }} />
                <span>@{user}</span>
              </a>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SobreNos;
