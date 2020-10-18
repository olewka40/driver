import React, { useContext, useState } from "react";
import { DataContext } from "../../context/DataContext";
import { TextField, Button } from "@material-ui/core";
import styled from "styled-components";

export const RegVenicle = () => {
  const [category, setCategory] = useState("");
  const [cost, setCost] = useState(0);
  const [exploitation, setExploitation] = useState(0);

  const { driver, account } = useContext(DataContext);
  const vehicleRegistration = () => {
    driver.methods
      .vehicleRegistration(category, cost, exploitation)
      .send({ from: account });
  };
  return (
    <Container>
      <TextField
        variant="outlined"
        placeholder="category"
        margin="dense"
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      />
      <TextField
        variant="outlined"
        placeholder="cost"
        margin="dense"
        onChange={(e) => {
          setCost(e.target.value);
        }}
      />
      <TextField
        variant="outlined"
        placeholder="exploitation"
        margin="dense"
        onChange={(e) => {
          setExploitation(e.target.value);
        }}
      />
      <Button color="primary" variant="contained" onClick={vehicleRegistration}>
        Зарегистрировать транспортное средство
      </Button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
`;
