import React, { useContext, useState } from "react";
import { DataContext } from "../context/DataContext";
import { Button, TextField } from "@material-ui/core";
import styled from "styled-components";

export const FinePay = () => {
  const { driver, account } = useContext(DataContext);
  const [licenseid, setLicenseid] = useState(0);
  const finePay = () => {
    driver.methods.finePay(licenseid).send({ from: account });
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
      <Button color="primary" variant="contained" onClick={finePay}>
        Оплатить штраф
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
