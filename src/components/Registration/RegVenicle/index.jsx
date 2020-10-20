import React, { useContext, useState } from "react";
import { DataContext } from "../../context/DataContext";
import { TextField, Button } from "@material-ui/core";
import styled from "styled-components";
import { StyledSelect } from "../RegLic";
import MenuItem from "@material-ui/core/MenuItem";

export const RegVenicle = () => {
  const [category, setCategory] = useState(0);
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
      <StyledSelect
        styled={{ height: 40, width: 223 }}
        label="category"
        value={category}
        required={true}
        variant="outlined"
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      >
        <MenuItem value={1}>A</MenuItem>
        <MenuItem value={2}>B</MenuItem>
        <MenuItem value={3}>C</MenuItem>
      </StyledSelect>
      <TextField
        variant="outlined"
        placeholder="Цена"
        type="number"
        margin="dense"
        onChange={(e) => {
          setCost(e.target.value);
        }}
      />
      <TextField
        variant="outlined"
        placeholder="Срок Эксплуатации"
        margin="dense"
        type="number"
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
