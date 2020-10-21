import React, { useContext, useState } from "react";
import { TextField, Button, MenuItem, Select } from "@material-ui/core";
import styled from "styled-components";
import { DataContext } from "../../context/DataContext";
import moment from "moment";

export const UpdateLic = () => {
  const [licenseid, setLicenseid] = useState(0);
  const [expire_date, setExpire_date] = useState(0);
  const [category, setCategory] = useState(0);

  const { driver, account } = useContext(DataContext);
  const licenseRegistration = () => {
    const date = moment(expire_date).format("DDMMYYYY");
    driver.methods
      .licenseRenewal(licenseid, date, category)
      .send({ from: account });
  };

  return (
    <Container>
      <TextField
        variant="outlined"
        placeholder="licenseid"
        margin="dense"
        required={true}
        type="number"
        onChange={(e) => {
          setLicenseid(e.target.value);
        }}
      />
      <TextField
        variant="outlined"
        placeholder="expire_date"
        margin="dense"
        type="date"
        required={true}
        onChange={(e) => {
          setExpire_date(e.target.value);
        }}
      />

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
      <Button color="primary" variant="contained" onClick={licenseRegistration}>
        Обновить лицензию
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
export const StyledSelect = styled(Select)`
  height: 40px;
  width: 223px;
  margin: 5px;
`;
