/* global setTimeout */

import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import { styled } from "@mui/system";

// Mock Data
const mockData = [
  { id: 1, name: "John Doe", role: "Developer", email: "john.doe@example.com" },
  { id: 2, name: "Jane Smith", role: "Manager", email: "jane.smith@example.com" },
  { id: 3, name: "Samuel Green", role: "Analyst", email: "samuel.green@example.com" },
  { id: 4, name: "Nancy White", role: "Designer", email: "nancy.white@example.com" },
];

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

const StyledTable = styled(TableContainer)({
  marginTop: "32px",
  marginBottom: "32px",
});

const TabContainer = styled(Box)({
  marginTop: "16px",
  marginBottom: "32px",
});

const SicScreen = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const fetchData = () => {
    setLoading(true);
    setTimeout(() => {
      setData(mockData);
      setLoading(false);
    }, 2000);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
    // Simulate fetching different data based on tab
    fetchData();
  };

  return (
    <Root maxWidth="md">
      <Header variant="h4">Système Informatique CICAD</Header>
      <Description variant="body1">
        C'est l'interface web de notre base de donnée SIC. Utilisez les onglets ci-dessous pour accéder aux différents
        types de requêtes sur : Affaires, Projets, Ratio, etc.
      </Description>
      <TabContainer>
        <Tabs
          value={activeTab}
          onChange={handleChange}
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="Affaires" />
          <Tab label="Projets" />
          <Tab label="Ratio" />
        </Tabs>
      </TabContainer>
      {loading ? (
        <CircularProgress />
      ) : (
        <StyledTable component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.role}</TableCell>
                  <TableCell>{row.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </StyledTable>
      )}
      <Button variant="contained" color="primary" onClick={fetchData}>
        Actualiser
      </Button>
    </Root>
  );
};

export default SicScreen;
