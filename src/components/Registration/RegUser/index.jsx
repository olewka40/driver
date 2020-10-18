import React, { useContext, useState } from "react";
import { DataContext } from "../../context/DataContext";
import { TextField, Button } from "@material-ui/core";
import styled from "styled-components";

export const RegUser = () => {
  const [fio, setFio] = useState("");
  const [accidents, setAccidents] = useState(0);
  const [unpayedFines, setUnpayedFines] = useState(0);
  const [expStart, setExpStart] = useState(0);
  const { driver, account } = useContext(DataContext);
  const driverRegistration = () => {
    driver.methods
      .driverRegistration(fio, accidents, unpayedFines, expStart)
      .send({ from: account });
  };
  return (
    <Container>
      <TextField
        variant="outlined"
        placeholder="fio"
        margin="dense"
        onChange={(e) => {
          setFio(e.target.value);
        }}
      />
      <TextField
        variant="outlined"
        placeholder="accidents"
        margin="dense"
        onChange={(e) => {
          setAccidents(e.target.value);
        }}
      />
      <TextField
        variant="outlined"
        placeholder="unpayedFines"
        margin="dense"
        onChange={(e) => {
          setUnpayedFines(e.target.value);
        }}
      />
      <TextField
        variant="outlined"
        placeholder="expStart"
        margin="dense"
        onChange={(e) => {
          setExpStart(e.target.value);
        }}
      />
      <Button color="primary" variant="contained" onClick={driverRegistration}>
        Зарегистрироваться
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
