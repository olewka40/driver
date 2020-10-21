import React, { useContext } from "react";
import { DataContext } from "../context/DataContext";
import { Button } from "@material-ui/core";
import styled from "styled-components";

export const InsuranceAccept = () => {
  const { driver, account } = useContext(DataContext);
  const insuranceAccept = () => {
    driver.methods.insuranceAccept().send({ from: account });
  };
  return (
    <Container>
      <Button onClick={insuranceAccept}>Принять Страховку</Button>
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
