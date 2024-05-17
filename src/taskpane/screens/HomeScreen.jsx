import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { styled } from "@mui/system";
// import { Link } from "react-router-dom";

const Root = styled(Container)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  backgroundColor: "#f9f9f9",
  textAlign: "center",
});

const Header = styled(Typography)({
  fontWeight: "bold",
  marginBottom: "16px",
  color: "#333",
});

const Description = styled(Typography)({
  marginBottom: "32px",
  color: "#555",
});

const Actions = styled(Box)({
  display: "flex",
  gap: "16px",
});

export default function HomeScreen() {
  return (
    <Root maxWidth="md">
      <Header variant="h4">CICAD TOOLBOX</Header>
      <Description variant="body1">
        Ceci est une preuve de concept (POC). L'idée est de regrouper tous les outils Excel de CICAD en un seul endroit.
      </Description>
      <Actions>
        {/* <Button variant="contained" color="primary" component={Link} to="/about">
          En savoir plus
        </Button> */}
        <Button
          variant="outlined"
          color="primary"
          component="a"
          href="mailto:qiu@cicad.fr?subject=Demande d'information&body=Bonjour CICAD,"
        >
          Contactez-nous
        </Button>
      </Actions>
    </Root>
  );
}
