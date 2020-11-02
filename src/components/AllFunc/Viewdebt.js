import React, { useContext, useState } from "react";
import { DataContext } from "../context/DataContext";
import { Button } from "@material-ui/core";
import styled from "styled-components";

export const ViewDbt = () => {
  const { driver, account } = useContext(DataContext);
  const [debt, setViewDdt] = useState();
  const viewDebt = async () => {
    const dep = await driver.methods.viewdebt().send({ from: account });
    setViewDdt(dep);
  };
  const insurancecredit = async () => {
    await driver.methods.insurancecredit().send({ from: account });
  };
  const creditReturn = async () => {
    await driver.methods.creditReturn().send({ from: account });
  };
  const expire_date_secondsCount = async () => {
    await driver.methods.expire_date_secondsCount().send({ from: account });
  };
  return (
    <Container>
      <Button color="primary" variant="contained" onClick={viewDebt}>
        Посмотреть банковский счет
      </Button>
      <Button color="primary" variant="contained" onClick={insurancecredit}>
        Кредит
      </Button>
      <Button color="primary" variant="contained" onClick={creditReturn}>
        Вернуть Кредит
      </Button>{" "}
      <Button
        color="primary"
        variant="contained"
        onClick={expire_date_secondsCount}
      >
        Истечение срока действия
      </Button>
      {debt}
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
