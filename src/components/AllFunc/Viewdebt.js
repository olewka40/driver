import React, { useContext } from "react";
import { DataContext } from "../context/DataContext";
import { Button } from "@material-ui/core";
import styled from "styled-components";

export const ViewDbt = () => {
  const { driver, account } = useContext(DataContext);

  const viewdebt = () => {
    driver.methods.viewdebt().send({ from: account });
  };
  const insurancecredit = () => {
    driver.methods.insurancecredit().send({ from: account });
  };
  const creditReturn = () => {
    driver.methods.creditReturn().send({ from: account });
  };
  const expire_date_secondsCount = () => {
    driver.methods.expire_date_secondsCount().send({ from: account });
  };
  return (
    <Container>
      <Button color="primary" variant="contained" onClick={viewdebt}>
        viewdebt
      </Button>
      <Button color="primary" variant="contained" onClick={insurancecredit}>
        insurancecredit
      </Button>
      <Button color="primary" variant="contained" onClick={creditReturn}>
        creditReturn
      </Button>{" "}
      <Button
        color="primary"
        variant="contained"
        onClick={expire_date_secondsCount}
      >
        expire_date_secondsCount
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
  .MuiButton-root {
    margin: 5px;
  }
`;
