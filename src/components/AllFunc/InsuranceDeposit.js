import React, { useContext } from "react";
import { DataContext } from "../context/DataContext";
import styled from "styled-components";
import { Button } from "@material-ui/core";

export const InsuranceDeposit = () => {
  const { driver, account } = useContext(DataContext);
  const insuranceDeposit = () => {
    driver.methods.insuranceDeposit().send({ from: account });
  };
  return (
    <Container>
      <Button onClick={insuranceDeposit}>Внести депозит</Button>
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
