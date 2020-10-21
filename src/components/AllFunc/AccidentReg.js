import React, { useContext, useState } from "react";
import { DataContext } from "../context/DataContext";
import { Button, TextField } from "@material-ui/core";
import styled from "styled-components";

export const AccidentReg = () => {
  const { driver, account } = useContext(DataContext);
  const [licenseid, setLicenseid] = useState(0);
  const accidentReg = () => {
    driver.methods.accidentReg(licenseid).send({ from: account });
  };
  return (
    <Container>
      <TextField
        variant="outlined"
        placeholder="Номер лицензии"
        margin="dense"
        type="number"
        onChange={(e) => {
          setLicenseid(e.target.value);
        }}
      />
      <Button color="primary" variant="contained" onClick={accidentReg}>
        Оформить дтп
      </Button>
    </Container>
  );
};
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  .MuiFormControl-marginDense {
    width: 222px;
  }
`;
