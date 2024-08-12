import React, { useState, useRef } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import { styled } from "@mui/system";
import axios from "axios";

const Root = styled(Container)({
  padding: "32px",
  backgroundColor: "#f9f9f9",
  borderRadius: "8px",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
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

const TabContainer = styled(Box)({
  marginTop: "16px",
  marginBottom: "32px",
});

const CardList = styled(Box)({
  display: "flex",
  flexWrap: "wrap",
  gap: "16px",
  justifyContent: "center",
});

const StyledCard = styled(Card)({
  width: "300px", // Fixed width for uniformity
  margin: "8px", // Adds space around cards
  boxSizing: "border-box",
});

const ContactSearchScreen = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const buttonRef = useRef(null);
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setData([]); // Clear previous search results when changing tabs
  };
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      buttonRef.current.click();
    }
  };
  const handleSearch = async () => {
    setLoading(true);
    try {
      const endpoint =
        activeTab === 0
          ? `http://localhost:4000/api/personnes/search/${encodeURIComponent(searchTerm)}`
          : `http://localhost:4000/api/entites/search/${encodeURIComponent(searchTerm)}`;

      const response = await axios.get(endpoint);
      console.log(response);
      setData(response.data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Root maxWidth="md">
      <Header variant="h4">Annuaire CICAD</Header>
      <Description variant="body1">
        Réchercher une personne ou une entité dans notre base de données
      </Description>
      <TabContainer>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="Personnes" />
          <Tab label="Entités" />
        </Tabs>
      </TabContainer>
      <Box mb={4}>
        <TextField
          label={activeTab === 0 ? "Nom de la personne" : "Nom de l'entité"}
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button variant="contained" color="primary" onClick={handleSearch} sx={{ marginTop: "16px" }} ref={buttonRef}>
          Search
        </Button>
      </Box>
      {loading ? (
        <CircularProgress />
      ) : (
        <CardList>
          {data.map((item) => {
            // Check if all relevant properties are null
            const shouldRenderCard =
              item.Personnes_Nom ||
              item.Personnes_Prenom ||
              item.PersonnesEntites_TelephoneProfessionel ||
              item.PersonnesEntites_TelephonePortableProfessionel ||
              item.Entites_Nom ||
              item.Entites_Adresse ||
              item.Entites_CodePostal ||
              item.Entites_Ville ||
              item.Entites_Telephone;

            // Only render the card if at least one property is not null
            if (shouldRenderCard) {
              return (
                <StyledCard key={item.Personnes_ID || item.Entites_Nom} variant="outlined">
                  <CardContent>
                    {activeTab === 0 ? (
                      <>
                        <Typography variant="h6">
                          {item.Personnes_Prenom} {item.Personnes_Nom}
                        </Typography>
                        {item.PersonnesEntites_TelephoneProfessionel && (
                          <Typography color="textSecondary">
                            Téléphone: {item.PersonnesEntites_TelephoneProfessionel}
                          </Typography>
                        )}
                        {item.PersonnesEntites_TelephonePortableProfessionel && (
                          <Typography color="textSecondary">
                            Portable: {item.PersonnesEntites_TelephonePortableProfessionel}
                          </Typography>
                        )}
                        <Typography color="textSecondary">Entité: {item.Entites_Nom || "N/A"}</Typography>
                      </>
                    ) : (
                      <>
                        <Typography variant="h6">{item.Entites_Nom}</Typography>
                        <Typography color="textSecondary">
                          Adresse: {item.Entites_Adresse}, {item.Entites_CodePostal}, {item.Entites_Ville}
                        </Typography>
                        <Typography color="textSecondary">Téléphone: {item.Entites_Telephone || "N/A"}</Typography>
                      </>
                    )}
                  </CardContent>
                </StyledCard>
              );
            } else {
              return null; // Don't render anything if all properties are null
            }
          })}
        </CardList>
      )}
    </Root>
  );
};

export default ContactSearchScreen;
