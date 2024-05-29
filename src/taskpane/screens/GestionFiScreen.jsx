import React, { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import handleNouvelleLigne from "../../functions/handleNouvelleLigne";
import handleExportRecap from "../../functions/handleExportRecap";

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

const Notification = styled(Box)(({ isError }) => ({
  position: "fixed",
  bottom: 0,
  width: "100%",
  backgroundColor: isError ? "#f44336" : "#4caf50",
  color: "white",
  textAlign: "center",
  padding: "16px",
  zIndex: 1000,
}));

export default function GestionFicScreen() {
  const [notification, setNotification] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSetNotification = (message, error = false) => {
    setNotification(message);
    setIsError(error);
  };

  return (
    <Root>
      <Header variant="h4">Outils Gestion Fi</Header>
      <Description variant="body1">
        Page dédiée pour accéder des fonctions de gestion fi pour libérer le fichier
      </Description>
      <ButtonContainer>
        <StyledButton variant="contained" color="primary" onClick={() => handleNouvelleLigne(handleSetNotification)}>
          Nouvelle Ligne
        </StyledButton>
        <StyledButton variant="contained" color="secondary" onClick={handleNouvelIndice}>
          Nouvel Indice
        </StyledButton>
        <StyledButton
          variant="contained"
          style={{ backgroundColor: "green", color: "white" }}
          onClick={() => handleExportRecap(handleSetNotification)}
        >
          Export RECAP
        </StyledButton>
      </ButtonContainer>
      {notification && <Notification isError={isError}>{notification}</Notification>}
    </Root>
  );
}

const handleNouvelIndice = async () => {
  // Add your logic here
};
