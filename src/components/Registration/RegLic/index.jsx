import React, { useContext, useState } from "react";
import { TextField, Button } from "@material-ui/core";
import styled from "styled-components";
import { DataContext } from "../../context/DataContext";

export const RegLic = () => {
  const [licenseid, setLicenseid] = useState(0);
  const [expire_date, setExpire_date] = useState(0);
  const [category, setCategory] = useState(0);

  const { driver, account } = useContext(DataContext);
  const licenseRegistration = () => {
    driver.methods
      .licenseRegistration(licenseid, expire_date, category)
      .send({ from: account });
  };
  return (
    <Container>
      <TextField
        variant="outlined"
        placeholder="licenseid"
        margin="dense"
        onChange={(e) => {
          setLicenseid(e.target.value);
        }}
      />
      <TextField
        variant="outlined"
        placeholder="expire_date"
        margin="dense"
        onChange={(e) => {
          setExpire_date(e.target.value);
        }}
      />
      <TextField
        variant="outlined"
        placeholder="category"
        margin="dense"
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      />

      <Button color="primary" variant="contained" onClick={licenseRegistration}>
        Зарегистрировать лицензию
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
