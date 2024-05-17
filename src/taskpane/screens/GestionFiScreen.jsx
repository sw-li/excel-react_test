import React, { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import handleNouvelleLigne from "../../functions/newRowInTable";

const Root = styled(Box)({
  padding: "32px",
  backgroundColor: "#f9f9f9",
  borderRadius: "8px",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  textAlign: "center",
});

const Header = styled(Typography)({
  marginBottom: "16px",
});

const Description = styled(Typography)({
  marginBottom: "32px",
  color: "#555",
});

const ButtonContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  gap: "16px",
});

const StyledButton = styled(Button)({
  minWidth: "150px",
});

const Notification = styled(Box)({
  position: "fixed",
  bottom: 0,
  width: "100%",
  backgroundColor: "#f44336",
  color: "white",
  textAlign: "center",
  padding: "16px",
  zIndex: 1000,
});

export default function GestionFicScreen() {
  const [notification, setNotification] = useState("");

  return (
    <Root>
      <Header variant="h4">Outils Gestion Fi</Header>
      <Description variant="body1">
        Page dédiée pour accéder des fonctions de gestion fi pour libérer le fichier
      </Description>
      <ButtonContainer>
        <StyledButton variant="contained" color="primary" onClick={() => handleNouvelleLigne(setNotification)}>
          Nouvelle Ligne
        </StyledButton>
        <StyledButton variant="contained" color="secondary" onClick={handleNouvelIndice}>
          Nouvel Indice
        </StyledButton>
        <StyledButton variant="contained" color="success" onClick={handleExporterExcel}>
          Exporter Excel
        </StyledButton>
      </ButtonContainer>
      {notification && <Notification>{notification}</Notification>}
    </Root>
  );
}

const handleNouvelIndice = async () => {
  // Add your logic here
};

const handleExporterExcel = async () => {
  // Add your logic here
};
